import { useState, useEffect } from 'react';
import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';
import groatABI from '../../dist/Groat.json';
import { hexStringToNumber } from '../utils/conversion';

export default function useGetPlayerQueue(
    provider: ethers.providers.Provider,
    gameAddress: string, 
    maxPlayers: number, 
    modalOpen: boolean,
    chain: string
) : string[] {

    const [playerQueue, setPlayerQueue] = useState(new Array(maxPlayers));

    const fetchData = async () => {

        const ethcallProvider = new Provider(provider, hexStringToNumber(chain));
        const groatGame = new Contract(gameAddress, groatABI.abi);

        const calls = [];
        for (let i = 0; i < maxPlayers; i++) {
            calls.push(groatGame.queue(i));
        }

        const results = await ethcallProvider.all(calls);
        const newPlayerQueue = new Array(maxPlayers);

        for (let i = 0; i < results.length; i++) {
            newPlayerQueue[i] = results[i].toLowerCase();
        }
        setPlayerQueue(newPlayerQueue);
    };

    useEffect(() => {

        if (!modalOpen) return;

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 2000);

        return () => {
            clearInterval(interval)
        };

    }, [maxPlayers, modalOpen, provider]);

    return playerQueue;
}