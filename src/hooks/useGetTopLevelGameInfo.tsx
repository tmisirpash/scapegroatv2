import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Contract, Provider } from 'ethers-multicall';
import { CHAIN_RPC_URLS } from '../utils/constants';
import groatABI from '../../dist/Groat.json';

export default function useGetTopLevelGameInfo(gameAddress: string, chain: string) : [
  string,
  number,
  number,
  string,
  boolean
] {
  const [stake, setStake] = useState('0');
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [queuePtr, setQueuePtr] = useState(0);
  const [revealBlockNumber, setRevealBlockNumber] = useState('1');
  const [loading, setLoading] = useState(true);

  const fetchData = async (ethcallProvider: Provider, groatGame: Contract) => {
    const [s, mp, q, r] = await ethcallProvider.all([
      groatGame.stake(),
      groatGame.maxPlayers(),
      groatGame.queuePtr(),
      groatGame.revealBlockNumber(),
    ]);

    setStake(s);
    setMaxPlayers(mp);
    setQueuePtr(q);
    setRevealBlockNumber(r);
  };

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(CHAIN_RPC_URLS.get(chain));
    const ethcallProvider = new Provider(provider, parseInt(chain.slice(2, chain.length), 16));
    const groatGame = new Contract(gameAddress, groatABI.abi);

    fetchData(ethcallProvider, groatGame).then(() => setLoading(false));
  }, []);

  return [stake, maxPlayers, queuePtr, revealBlockNumber, loading];
}
