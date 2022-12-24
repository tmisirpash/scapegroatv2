import { useState, useEffect } from 'react';
import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';
import groatABI from '../../dist/Groat.json';
import { hexStringToNumber } from '../utils/conversion';

export default function useGetPlayerQueue(
    provider: ethers.providers.JsonRpcProvider,
    gameAddress: string, 
    maxPlayers: number, 
    chain: string
) : [
    string[],
    number,
    string,
    boolean
]{

    const [playerQueue,] = useState(new Array(maxPlayers));
    const [queuePtr, setQueuePtr] = useState(0);
    const [revealBlockNumber, setRevealBlockNumber] = useState('1');
    const [, forceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    // const updatePlayerQueue = (index: number, value: string) => {
    //     playerQueue[index] = value;
    //     forceUpdate(update => !update);
    // };

    const fetchData = async () => {
        const ethcallProvider = new Provider(provider, hexStringToNumber(chain));
        const groatGame = new Contract(gameAddress, groatABI.abi);

        const calls = [];
        calls.push(groatGame.queuePtr());
        calls.push(groatGame.revealBlockNumber());
        for (let i = 0; i < maxPlayers; i++) {
            calls.push(groatGame.queue(i));
        }

        const results = await ethcallProvider.all(calls);
        setQueuePtr(results[0]);
        setRevealBlockNumber(results[1].toString());
        for (let i = 2; i < results.length; i++) {
            playerQueue[i-2] = results[i];
        }
        setLoading(false);
        console.log(playerQueue.length);
    };

    useEffect(() => {

        const joinFilter = {
            address: gameAddress,
            topics: [
                ethers.utils.id("Join(address,uint8)"),
            ]
        };

        const leaveFilter = {
            address: gameAddress,
            topics: [
                ethers.utils.id("Leave(address,uint8)")
            ]
        };

        provider.on(joinFilter, (log, event) => {
            console.log(log);
            console.log(event);
        });

        provider.on(leaveFilter, (log, event) => {
            console.log(log);
            console.log(event);
        })

        fetchData();
    }, [maxPlayers]);

    return [
        playerQueue,
        queuePtr,
        revealBlockNumber,
        loading
    ];
}