import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      accounts: {
        count: 50
      }
    },
    mumbai: {
      url:  `https://rpc-mumbai.maticvigil.com`,
      accounts: {
        mnemonic: process.env.MNEMONIC || ''
      }
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC || ''
      }
    }
  }
};

export default config;
