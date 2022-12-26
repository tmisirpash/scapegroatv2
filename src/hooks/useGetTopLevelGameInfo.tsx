import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Contract, Provider, ContractCall } from 'ethers-multicall';
import { KNOWN_ADDRESSES } from '../utils/constants';
import groatABI from '../../dist/Groat.json';
import { hexStringToNumber } from '../utils/conversion';

export interface topLevelGameInfo {
  gameAddress: string;
  stake: string;
  maxPlayers: number;
}

const EMPTY_GAME_INFO: topLevelGameInfo[] = [];

export function useGetTopLevelGameInfo(
  provider: ethers.providers.Provider,
  chain: string,
) : [
    topLevelGameInfo[],
    boolean
  ] {
  const [gameInfo, setGameInfo] = useState(EMPTY_GAME_INFO);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const chainDec = hexStringToNumber(chain);
    const ethcallProvider = new Provider(provider, chainDec);

    const calls: ContractCall[] = [];
    KNOWN_ADDRESSES.get(chain)?.forEach((a) => {
      const groatGame = new Contract(a, groatABI.abi);
      calls.push(groatGame.stake());
      calls.push(groatGame.maxPlayers());
    });

    const data = await ethcallProvider.all(calls);
    const newGameInfo = new Array(KNOWN_ADDRESSES.size * 2);
    for (let i = 0; i < data.length; i += 2) {
      newGameInfo[i / 2] = {
        gameAddress: (KNOWN_ADDRESSES.get(chain) || [])[i / 2],
        stake: data[i],
        maxPlayers: data[i + 1],
      };
    }

    setGameInfo(newGameInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [provider]);

  return [
    gameInfo,
    loading,
  ];
}
