import { BigNumber } from 'ethers';

interface groatGame {
  address: string;
  stake: BigNumber;
  players: number;
  queuePtr: number;
  revealBlockNumber: BigNumber;
  groatIndex: number;
  groatAddress: string;
}

export default groatGame;
