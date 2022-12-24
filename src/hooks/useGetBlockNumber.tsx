import { useState, useEffect } from 'react';
import { providers } from 'ethers';

export default function useGetBlockNumber(provider: providers.JsonRpcProvider) : number {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

  async function getBlock() {
    setCurrentBlockNumber(await provider.getBlockNumber());
  }

  useEffect(() => {
    getBlock();

    provider.on('block', (number) => {
      setCurrentBlockNumber(number);
    });
  }, []);

  return currentBlockNumber;
}
