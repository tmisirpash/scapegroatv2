import { ethers } from "hardhat";

async function main() {

  const Groat = await ethers.getContractFactory("Groat");

  const params = [
    [ethers.utils.parseEther('0.0001'), 11],
    [ethers.utils.parseEther('0.5'), '51'],
    [ethers.utils.parseEther('0.5'), '101'],
    [ethers.utils.parseEther('1'), '51'],
    [ethers.utils.parseEther('1'), '101'],
    [ethers.utils.parseEther('5'), '51'],
    [ethers.utils.parseEther('5'), '101'],
    [ethers.utils.parseEther('10'), '51'],
    [ethers.utils.parseEther('10'), '101'],
    [ethers.utils.parseEther('50'), '51'],
    [ethers.utils.parseEther('50'), '101'],
  ];

  const deployments = [];
  for (let i = 0; i < params.length; i++) {
    deployments.push(await Groat.deploy(params[i][0], params[i][1]));
  }

  const addresses = [];
  for (let i = 0; i < deployments.length; i++) {
    const g = await deployments[i].deployed();
    addresses.push(g.address);
  }

  console.log(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
