import { useState, useEffect } from 'react';
import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';
import groatABI from '../../dist/Groat.json';
import { hexStringToNumber } from '../utils/conversion';
import { DEAD_ADDRESS } from '../utils/constants';

export default function useGetPlayerQueue(
    provider: ethers.providers.Provider,
    gameAddress: string, 
    maxPlayers: number, 
    modalOpen: boolean,
    chain: string
) : [
    string[],
    number,
    number
 ] {

    const [playerQueue, setPlayerQueue] = useState(new Array(maxPlayers));
    const [groatIndex, setGroatIndex] = useState(255);
    const [queuePtrPlayerQueue, setQueuePtrPlayerQueue] = useState(0);

    const fetchData = async () => {

        const ethcallProvider = new Provider(provider, hexStringToNumber(chain));
        const groatGame = new Contract(gameAddress, groatABI.abi);

        const calls = [];
        for (let i = 0; i < maxPlayers; i++) {
            calls.push(groatGame.queue(i));
        }
        calls.push(groatGame.queuePtr());
        calls.push(groatGame.groatIndex());

        const results = await ethcallProvider.all(calls);
        const newPlayerQueue = new Array(maxPlayers);

        for (let i = 0; i < results.length-2; i++) {
            newPlayerQueue[i] = results[i].toLowerCase();
        }
        setQueuePtrPlayerQueue(results[results.length - 2]);
        setGroatIndex(results[results.length - 1]);
        setPlayerQueue(newPlayerQueue);
    };

    useEffect(() => {

        if (!modalOpen) return;

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 4000);

        return () => {
            clearInterval(interval)
        };

    }, [maxPlayers, modalOpen, provider]);

    return [playerQueue, groatIndex, queuePtrPlayerQueue];
}