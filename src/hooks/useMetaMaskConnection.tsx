import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  CHAIN_RPC_URLS,
  DEFAULT_CHAIN_ID,
  DEFAULT_CHAIN_NAME,
  DEFAULT_CHAIN_CURRENCY,
  DEFAULT_CHAIN_CURRENCY_DECIMALS,
} from '../utils/constants';

async function isMetaMaskInstalled() {
  const provider = await detectEthereumProvider();
  if (!provider) return null;
  if (Array.isArray(window.ethereum.providers)) {
    const findMM = window.ethereum.providers.find((p: any) => p.isMetaMask);
    return findMM !== undefined ? findMM : window.ethereum.providers[0];
  }
  return window.ethereum;
}

async function getAccounts(provider: any) {
  return provider.request({ method: 'eth_accounts' });
}

export default function useMetaMaskConnection() :[
  any,
  string,
  string,
  string,
  string,
  () => void] {
  const [accountAddress, setAccountAddress] = useState('0x');
  const [chain, setChain] = useState(DEFAULT_CHAIN_ID);
  const [connectionButtonText, setConnectionButtonText] = useState('Connect Wallet');
  const [connectionStatusText, setConnectionStatusText] = useState('');
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [prov, setProv] = useState<any>();

  async function getConnectionInfo() {
    const provider = await isMetaMaskInstalled();
    setProv(provider);
    setIsInstalled(Boolean(provider));
    setConnectionButtonText('Connect Wallet');
    if (!provider) return;
    try {
      getAccounts(provider).then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setIsConnected(true);
          setAccountAddress(res[0]);
          setConnectionButtonText(res[0]);
          let cid = `${provider.chainId}`;
          if (!cid.includes('0x')) {
            cid = `0x${provider.chainId.toString(16)}`;
          }
          if (CHAIN_RPC_URLS.has(cid)) {
            setConnectionStatusText('');
            setChain(cid);
          } else {
            setConnectionStatusText(`
            Note: You are on an unsupported network. 
            Please switch to Polygon Mumbai Testnet.`);
          }
        }
      });
    } catch (e) {

    }
  }

  async function connectWallet() {
    const provider = await isMetaMaskInstalled();
    setProv(provider);
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: DEFAULT_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902
        || (
          switchError.data?.originalError?.code
          && switchError.data?.originalError?.code === 4902
        )) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: DEFAULT_CHAIN_ID,
                chainName: DEFAULT_CHAIN_NAME,
                nativeCurrency: {
                  symbol: DEFAULT_CHAIN_CURRENCY,
                  decimals: DEFAULT_CHAIN_CURRENCY_DECIMALS,
                },
                rpcUrls: [CHAIN_RPC_URLS.get(DEFAULT_CHAIN_ID)],
              },
            ],
          });
        } catch (addError) {
          return;
        }
      } else {
        return;
      }
    }

    provider.request({ method: 'eth_requestAccounts' }).then((res: any) => {
      setIsConnected(true);
      const addr = Array.isArray(res) ? res[0] : '';
      setAccountAddress(addr);
      setConnectionButtonText(addr);
      setConnectionStatusText('');
    });
  }

  function connectionButtonOnClick() {
    if (!isInstalled) {
      setConnectionStatusText('Please refresh the page once MetaMask installation has finished.');
      window.open('https://metamask.io');
    }
    if (!isConnected) {
      connectWallet();
    }
  }

  useEffect(() => {
    function handleAccountChange() {
      setIsConnected(false);
      getConnectionInfo();
    }

    function handleChainChange() {
      getConnectionInfo();
    }

    isMetaMaskInstalled().then((provider) => {
      if (!provider) return;
      provider.on('accountsChanged', handleAccountChange);
      provider.on('chainChanged', handleChainChange);
    });
  });

  useEffect(() => {
    getConnectionInfo();
  }, []);

  return [
    prov,
    accountAddress,
    chain,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ];
}
