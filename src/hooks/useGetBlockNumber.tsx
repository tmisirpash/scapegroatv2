import { useState, useEffect } from 'react';
import { providers } from 'ethers';

export default function useGetBlockNumber() : number {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

  async function getBlock(provider: providers.JsonRpcProvider) {
    setCurrentBlockNumber(await provider.getBlockNumber());
  }

  useEffect(() => {
    let provider = new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com' as any);
    if (window.ethereum) {
      provider = new providers.Web3Provider(window.ethereum as any);
    }
    getBlock(provider);

    provider.on('block', (number) => {
      setCurrentBlockNumber(number);
    });
  }, []);

  return currentBlockNumber;
}
