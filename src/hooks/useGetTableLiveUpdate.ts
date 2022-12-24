import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Contract, Provider, ContractCall } from 'ethers-multicall';
import { hexStringToNumber } from '../utils/conversion';
import { KNOWN_ADDRESSES } from '../utils/constants';
import groatABI from '../../dist/Groat.json';

const EMPTY_GAME_INFO: liveInfoData[] = [];

export interface liveInfoData {
    queuePtr: number;
    revealBlockNumber: string;
}

export function useGetTableLiveUpdate(
    provider: ethers.providers.Provider,
    chain: string
) : [
    liveInfoData[],
    boolean
] {


    const [liveInfo, setLiveInfo] = useState(EMPTY_GAME_INFO);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const chainDec = hexStringToNumber(chain);
        const ethcallProvider = new Provider(provider, chainDec);

        const calls: ContractCall[] = [];
        KNOWN_ADDRESSES.get(chain)?.forEach((a) => {
            const groatGame = new Contract(a, groatABI.abi);
            calls.push(groatGame.queuePtr());
            calls.push(groatGame.revealBlockNumber());
        });

        const results = await ethcallProvider.all(calls);
        const newLiveInfo = new Array(KNOWN_ADDRESSES.size * 2);
        for (let i = 0; i < results.length; i+=2) {
            newLiveInfo[i/2] = {
                queuePtr: results[i],
                revealBlockNumber: results[i+1]
            };
        }
        setLiveInfo(newLiveInfo);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(), 2000);

        return () => clearInterval(interval);
    }, []);

    return [
        liveInfo,
        loading    
    ];
}