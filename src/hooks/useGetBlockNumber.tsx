import { useState, useEffect } from 'react';
import { providers } from 'ethers';

export default function useGetBlockNumber() : number {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

  async function getBlock() {
    let provider = new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com' as any);
    if (window.ethereum) {
      provider = new providers.Web3Provider(window.ethereum as any);
    }
    setCurrentBlockNumber(await provider.getBlockNumber());
  }

  useEffect(() => {
    getBlock();
    const interval = setInterval(async () => {
      getBlock();
    }, 12000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentBlockNumber;
}
