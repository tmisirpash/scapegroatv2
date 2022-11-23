import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('GroatFactory', () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployGroatFactoryFixture() {
    const GroatFactory = await ethers.getContractFactory('GroatFactory');
    const groatFactory = await GroatFactory.deploy();

    return { groatFactory };
  }

  describe('Creation', () => {
    it('Creates a game', async () => {
      const { groatFactory } = await loadFixture(deployGroatFactoryFixture);
      await expect(groatFactory.createGame(ethers.utils.parseEther('0.254'), 255)).to.emit(groatFactory, 'GameCreated');
      expect(await groatFactory.getLength(255)).to.equal('1');
    });
  });
});
