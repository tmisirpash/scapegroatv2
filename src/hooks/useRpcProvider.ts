import { useMemo } from 'react';
import { ethers } from 'ethers';
import { CHAIN_RPC_URLS } from '../utils/constants';
import { hexStringToNumber } from '../utils/conversion';

export default function useRpcProvider(chain: string) {

    const provider = useMemo(() => {
        return new ethers.providers.JsonRpcProvider(
            CHAIN_RPC_URLS.get(chain), hexStringToNumber(chain)
        )
    }, [chain]);

    return provider;
}