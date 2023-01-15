import { useMemo } from 'react';
import { ethers } from 'ethers';
import { CHAIN_RPC_URLS, DEFAULT_CHAIN_ID } from '../utils/constants';

export default function useRpcProvider(prov: any, chain: string, address: string) {
    const providerChain = prov !== undefined && prov !== null ? prov.chainId : '';
    const provider = useMemo(() => {
        if (address === '0x' || !CHAIN_RPC_URLS.has(providerChain)) {
                return new ethers.providers.JsonRpcProvider(CHAIN_RPC_URLS.get(DEFAULT_CHAIN_ID));
        }
        return new ethers.providers.Web3Provider(prov);
    }, [prov, address, chain, providerChain]);
    
    return provider;
}