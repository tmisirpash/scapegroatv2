import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { network, ethers } from 'hardhat';

const deadAddress = '0xdEAD000000000000000042069420694206942069';

describe('Groat', () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployGroatFixture() {
    const signers = await ethers.getSigners();
    const Groat = await ethers.getContractFactory('Groat');
    const groat = await Groat.deploy(ethers.utils.parseEther('1'), '51');

    return { groat, signers };
  }

  describe('Deployment', () => {
    it('Should deploy successfully', async () => {
      const { groat } = await loadFixture(deployGroatFixture);
      const stake = await groat.stake();
      expect(stake).to.equal(ethers.utils.parseEther('1'));
      const maxPlayers = await groat.maxPlayers();
      expect(maxPlayers).to.equal(51);
      const payout = await groat.payout();
      expect(payout).to.equal(ethers.utils.parseEther('1.02'));
    });
  });

  describe('Adding entries', () => {
    it('Should add 1 entry', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.depositEth(false, { value: ethers.utils.parseEther('1') });

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(1);

      const queue = await groat.queue(0);
      expect(queue).to.equal(signers[0].address);
    });

    it('Should add 5 entries from a single account', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.depositEth(false, { value: ethers.utils.parseEther('5') });

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(5);

      for (let i = 0; i < 5; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }
    });
    it('Should revert adding and successfully add based on boolean fulfillment flag', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.connect(signers[0]).depositEth(false, { value: ethers.utils.parseEther('50') });
      await expect(groat.connect(signers[1]).depositEth(false, { value: ethers.utils.parseEther('2') })).to.be.revertedWith('Exact order not met.');

      const originalBalance = await ethers.provider.getBalance(groat.address);
      await groat.connect(signers[1]).depositEth(true, { value: ethers.utils.parseEther('2') });
      const newBalance = await ethers.provider.getBalance(groat.address);

      expect(newBalance.sub(originalBalance)).to.equal(ethers.utils.parseEther('1'));

      expect(await groat.queuePtr()).to.equal(51);
    });

    it('Should truncate 55 entries to 51 entries from a single account', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.depositEth(true, { value: ethers.utils.parseEther('55') });

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(51);

      for (let i = 0; i < 51; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }

      const revealBlockNumber = await groat.revealBlockNumber();
      expect(revealBlockNumber).to.equal('77');
    });

    it('Should add 51 entries from a single account one at a time', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      for (let i = 0; i < 51; i++) {
        await groat.depositEth(false, { value: ethers.utils.parseEther('1') });
      }

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(51);

      for (let i = 0; i < 51; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }

      const revealBlockNumber = await groat.revealBlockNumber();
      expect(revealBlockNumber).to.equal('127');
    });

    it('Should run 5 games in a row with entries from a random pool of addresses', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 51; j++) {
          const groatIndex = await groat.groatIndex();
          const originalBalance = await ethers.provider.getBalance(groat.address);
          const randInt = Math.floor(Math.random() * (signers.length - 1));
          const originalAddress = await groat.queue(j);
          const originalAddressBalance = await ethers.provider.getBalance(originalAddress);

          const trans = await groat.connect(signers[randInt]).depositEth(false, { value: ethers.utils.parseEther('1') });
          const receipt = await trans.wait();
          const gasCostForTxn = receipt.gasUsed.mul(receipt.effectiveGasPrice);
          expect(await groat.queue(j)).to.equal(signers[randInt].address);

          const newBalance = await ethers.provider.getBalance(groat.address);
          const newAddressBalance = await ethers.provider.getBalance(originalAddress);

          // Test game's invariants.
          if (i > 0) {
            if (j === groatIndex) {
              expect(newBalance.sub(originalBalance)).to.equal(ethers.utils.parseEther('1'));
            } else {
              expect(newBalance.sub(originalBalance)).to.equal(ethers.utils.parseEther('-0.02'));
            }
          }

          const newAddressBalanceWithGasUsed = newAddressBalance.add(gasCostForTxn);
          // //Test wallet balances
          if (i > 0) {
            if (j === groatIndex) {
              expect(newAddressBalance).to.equal(newAddressBalance);
            } else if (originalAddress !== signers[randInt].address) {
              expect(newAddressBalance.sub(originalAddressBalance)).to.equal(ethers.utils.parseEther('1.02'));
            } else {
              expect(newAddressBalanceWithGasUsed.sub(originalAddressBalance)).to.equal(ethers.utils.parseEther('0.02'));
            }
          }
        }
        for (let j = 0; j < 74; j++) {
          await network.provider.send('evm_mine');
        }
      }

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(51);
    });
  });

  describe('Deleting entries', () => {
    it('Should return an error if zero entries specified', async () => {
      const { groat } = await loadFixture(deployGroatFixture);
      await expect(groat.removeEntries(0)).to.be.revertedWith('Needs to be non-zero.');
    });
    it('Should return an error if a game is in progress', async () => {
      const { groat } = await loadFixture(deployGroatFixture);
      await groat.depositEth(false, { value: ethers.utils.parseEther('51') });
      await expect(groat.removeEntries(5)).to.be.revertedWith('Game in progress.');
    });
    it('Should add two entries and remove one', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.depositEth(false, { value: ethers.utils.parseEther('2') });
      await groat.removeEntries(1);

      expect(await groat.queuePtr()).to.equal(1);
      expect(await groat.queue(0)).to.equal(signers[0].address);
      expect(await groat.queue(1)).to.equal(deadAddress);
    });
    it('Should add an entry, remove it, then add it back', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.depositEth(false, { value: ethers.utils.parseEther('1.0') });
      await groat.removeEntries(1);

      let queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(0);

      await groat.depositEth(false, { value: ethers.utils.parseEther('1.0') });

      queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(1);
      expect(await groat.queue(0)).to.equal(signers[0].address);
    });

    it("Should add an entry, remove it, then replace it with a different account's entry", async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.depositEth(false, { value: ethers.utils.parseEther('1.0') });
      await groat.removeEntries(1);

      let queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(0);

      await groat.connect(signers[1]).depositEth(false, { value: ethers.utils.parseEther('1.0') });

      queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(1);
      expect(await groat.queue(0)).to.equal(signers[1].address);
    });

    it('Should correctly replace one person\'s entry with another\'s in the internal data structures', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.connect(signers[0]).depositEth(false, { value: ethers.utils.parseEther('5') });
      await groat.connect(signers[1]).depositEth(false, { value: ethers.utils.parseEther('10') });

      await groat.connect(signers[0]).removeEntries(2);

      expect(await groat.queuePtr()).to.equal(13);
      expect(await groat.queue(0)).to.equal(signers[1].address);
      expect(await groat.queue(1)).to.equal(signers[1].address);
      expect(await groat.queue(2)).to.equal(signers[0].address);
      expect(await groat.queue(3)).to.equal(signers[0].address);
      expect(await groat.queue(4)).to.equal(signers[0].address);
      expect(await groat.queue(5)).to.equal(signers[1].address);
      expect(await groat.queue(6)).to.equal(signers[1].address);
      expect(await groat.queue(7)).to.equal(signers[1].address);
      expect(await groat.queue(8)).to.equal(signers[1].address);
      expect(await groat.queue(9)).to.equal(signers[1].address);
      expect(await groat.queue(10)).to.equal(signers[1].address);
      expect(await groat.queue(11)).to.equal(signers[1].address);
      expect(await groat.queue(12)).to.equal(signers[1].address);
      expect(await groat.queue(13)).to.equal(deadAddress);
      expect(await groat.queue(14)).to.equal(deadAddress);
    });

    it('Should remove fewer entries than requested', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.connect(signers[0]).depositEth(false, { value: ethers.utils.parseEther('5') });
      await groat.connect(signers[1]).depositEth(false, { value: ethers.utils.parseEther('10') });

      await groat.connect(signers[0]).removeEntries(7); // More than actually exist.

      expect(await groat.queuePtr()).to.equal(10);
      for (let i = 0; i < 10; i++) {
        expect(await groat.queue(i)).to.equal(signers[1].address);
      }
    });
  });
});
