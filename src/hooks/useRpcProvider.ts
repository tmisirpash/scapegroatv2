import { useMemo } from 'react';
import { ethers } from 'ethers';
import { CHAIN_RPC_URLS, DEFAULT_CHAIN_ID } from '../utils/constants';

export default function useRpcProvider(prov: any, chain: string, address: string) {
    const provider = useMemo(() => {
        if (address === '0x' || !CHAIN_RPC_URLS.has(prov.chainId)) {
             return new ethers.providers.JsonRpcProvider(CHAIN_RPC_URLS.get(DEFAULT_CHAIN_ID));
        }
        return new ethers.providers.Web3Provider(prov);
    }, [prov, chain, address]);

    return provider;
}