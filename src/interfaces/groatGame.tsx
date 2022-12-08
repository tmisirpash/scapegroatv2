import { BigNumber } from 'ethers';

interface groatGame {
  address: string;
  stake: BigNumber;
  players: number;
  queuePtr: number;
  revealBlockNumber: BigNumber;
}

export default groatGame;
