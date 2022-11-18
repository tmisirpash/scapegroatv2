import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { network, ethers } from 'hardhat';

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
      await groat.depositEth({ value: ethers.utils.parseEther('1') });

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(1);

      const queue = await groat.queue(0);
      expect(queue).to.equal(signers[0].address);

      const playerEntries = await groat.playerEntries(signers[0].address);
      expect(playerEntries).to.equal('1');
    });

    it('Should add 5 entries from a single account', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.depositEth({ value: ethers.utils.parseEther("5")});

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(5);

      for (let i = 0; i < 5; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }

      const playerEntries = await groat.playerEntries(signers[0].address);
      expect(playerEntries).to.equal('31'); // Bitmap should be 2^5 - 1
    });

    it('Should truncate 55 entries to 51 entries from a single account', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.depositEth({ value: ethers.utils.parseEther('55') });

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(51);

      for (let i = 0; i < 51; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }

      const playerEntries = await groat.playerEntries(signers[0].address);
      expect(playerEntries).to.equal('2251799813685247'); // 2^51-1

      const revealBlockNumber = await groat.revealBlockNumber();
      expect(revealBlockNumber).to.equal('66');
    });

    it('Should add 51 entries from a single account one at a time', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      for (let i = 0; i < 51; i++) {
        await groat.depositEth({ value: ethers.utils.parseEther('1') });
      }

      const queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(51);

      for (let i = 0; i < 51; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }

      const playerEntries = await groat.playerEntries(signers[0].address);
      expect(playerEntries).to.equal('2251799813685247'); // 2^51-1

      const revealBlockNumber = await groat.revealBlockNumber();
      expect(revealBlockNumber).to.equal('116');
    });

    it('Should invalidate own bitmap', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.depositEth({ value: ethers.utils.parseEther('51') });

      const revealBlockNumber = await groat.revealBlockNumber();
      expect(revealBlockNumber).to.equal('66');

      // Skip forward 63 blocks.
      for (let i = 0; i < 63; i++) {
        await network.provider.send('evm_mine');
      }

      const currBlockNo = (await ethers.provider.getBlock('latest')).number + 1;
      expect(currBlockNo).to.equal(revealBlockNumber);

      await groat.depositEth({ value: ethers.utils.parseEther('2') });
      for (let i = 0; i < 2; i++) {
        expect(await groat.queue(i)).to.equal(signers[0].address);
      }
      const playerEntries = await groat.playerEntries(signers[0].address);
      expect(playerEntries).to.equal('3'); // 2^2-1
    });

    it("Should invalidate another's bitmap", async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);
      await groat.connect(signers[0]).depositEth({ value: ethers.utils.parseEther('51') });

      // Skip forward 63 blocks.
      for (let i = 0; i < 63; i++) {
        await network.provider.send('evm_mine');
      }

      await groat.connect(signers[1]).depositEth({ value: ethers.utils.parseEther('1') });
      expect(await groat.queue(0)).to.equal(signers[1].address);

      await groat.connect(signers[0]).depositEth({ value: ethers.utils.parseEther('1') });
      expect(await groat.queue(1)).to.equal(signers[0].address);

      const playerEntries1 = await groat.playerEntries(signers[0].address);
      expect(playerEntries1).to.equal('2');
      const playerEntries2 = await groat.playerEntries(signers[1].address);
      expect(playerEntries2).to.equal('1');
    });

    // it("Should run 5 games in a row with all unique addresses", async function() {
    //   const {groat, signers} = await loadFixture(deployGroatFixture);

    //   for (let i = 0; i < 5; i++) {
    //     for (let j = 0; j < 51; j++) {
    //       await groat.connect(signers[51*i+j]).depositEth({value: ethers.utils.parseEther("1")});
    //       expect(await groat.queue(j)).to.equal(signers[51*i+j].address);
    //       expect(await groat.playerEntries(signers[51*i+j].address)).to.equal(Math.pow(2, j));
    //     }
    //     for (let j = 0; j < 63; j++) {
    //       await network.provider.send("evm_mine");
    //     }
    //   }

    //   const queuePtr = await groat.queuePtr();
    //   expect(queuePtr).to.equal(51);
    // });
  });

  describe('Deleting entries', () => {
    it('Should add two entries and remove one', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.depositEth({ value: ethers.utils.parseEther('2') });
      await groat.removeEntries(1);

      expect(await groat.queuePtr()).to.equal(1);
      expect(await groat.queue(0)).to.equal(signers[0].address);
      expect(await groat.queue(1)).to.equal(ethers.constants.AddressZero);
      expect(await groat.playerEntries(signers[0].address)).to.equal('1');
    });
    it('Should add an entry, remove it, then add it back', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.depositEth({ value: ethers.utils.parseEther('1.0') });
      await groat.removeEntries(1);

      let queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(0);

      expect(await groat.playerEntries(signers[0].address)).to.equal('0');
      expect(await groat.playerEntries(signers[0].address)).to.equal(ethers.constants.AddressZero);

      await groat.depositEth({ value: ethers.utils.parseEther('1.0') });

      queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(1);
      expect(await groat.queue(0)).to.equal(signers[0].address);
      expect(await groat.playerEntries(signers[0].address)).to.equal('1');
    });

    it("Should add an entry, remove it, then replace it with a different account's entry", async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.depositEth({ value: ethers.utils.parseEther('1.0') });
      await groat.removeEntries(1);

      let queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(0);

      expect(await groat.playerEntries(signers[0].address)).to.equal('0');
      expect(await groat.playerEntries(signers[0].address)).to.equal(ethers.constants.AddressZero);

      await groat.connect(signers[1]).depositEth({ value: ethers.utils.parseEther('1.0') });

      queuePtr = await groat.queuePtr();
      expect(queuePtr).to.equal(1);
      expect(await groat.queue(0)).to.equal(signers[1].address);
      expect(await groat.playerEntries(signers[1].address)).to.equal('1');
    });

    it('Should correctly replace one person\'s entry with another\'s in the internal data structures', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.connect(signers[0]).depositEth({ value: ethers.utils.parseEther('5') });
      await groat.connect(signers[1]).depositEth({ value: ethers.utils.parseEther('10') });

      await groat.connect(signers[0]).removeEntries(2);

      expect(await groat.queuePtr()).to.equal(13);
      expect(await groat.queue(0)).to.equal(signers[0].address);
      expect(await groat.queue(1)).to.equal(signers[0].address);
      expect(await groat.queue(2)).to.equal(signers[0].address);
      expect(await groat.queue(3)).to.equal(signers[1].address);
      expect(await groat.queue(4)).to.equal(signers[1].address);
      expect(await groat.queue(5)).to.equal(signers[1].address);
      expect(await groat.queue(6)).to.equal(signers[1].address);
      expect(await groat.queue(7)).to.equal(signers[1].address);
      expect(await groat.queue(8)).to.equal(signers[1].address);
      expect(await groat.queue(9)).to.equal(signers[1].address);
      expect(await groat.queue(10)).to.equal(signers[1].address);
      expect(await groat.queue(11)).to.equal(signers[1].address);
      expect(await groat.queue(12)).to.equal(signers[1].address);
      expect(await groat.queue(13)).to.equal(ethers.constants.AddressZero);
      expect(await groat.queue(14)).to.equal(ethers.constants.AddressZero);

      expect(await groat.playerEntries(signers[0].address)).to.equal('7'); // 111
      expect(await groat.playerEntries(signers[1].address)).to.equal('8184'); // 11111111111000
    });

    it('Should remove fewer entries than requested', async () => {
      const { groat, signers } = await loadFixture(deployGroatFixture);

      await groat.connect(signers[0]).depositEth({ value: ethers.utils.parseEther('5') });
      await groat.connect(signers[1]).depositEth({ value: ethers.utils.parseEther('10') });

      await groat.connect(signers[0]).removeEntries(7); // More than actually exist.

      expect(await groat.queuePtr()).to.equal(10);
      for (let i = 0; i < 10; i++) {
        expect(await groat.queue(i)).to.equal(signers[1].address);
      }

      expect(await groat.playerEntries(signers[0].address)).to.equal('0');
      expect(await groat.playerEntries(signers[1].address)).to.equal('1023');
    });
  });
});
