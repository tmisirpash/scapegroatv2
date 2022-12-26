import { useState, useEffect } from 'react';
import { providers } from 'ethers';

export default function useGetBlockNumber(provider: providers.Provider) : number {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

  async function getBlock() {
    setCurrentBlockNumber(await provider.getBlockNumber());
  }

  useEffect(() => {
    getBlock();

    const interval = setInterval(() => getBlock(), 2000);

    return () => clearInterval(interval);
  }, [provider]);

  return currentBlockNumber;
}
