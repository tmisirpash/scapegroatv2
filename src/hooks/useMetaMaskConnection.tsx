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
  return Boolean(provider);
}

async function getAccounts() {
  return window.ethereum?.request({ method: 'eth_accounts' });
}

export default function useMetaMaskConnection() : [string, string, string, string, () => void] {
  const [accountAddress, setAccountAddress] = useState('0x');
  const [chain, setChain] = useState(DEFAULT_CHAIN_ID);
  const [connectionButtonText, setConnectionButtonText] = useState('Connect Wallet');
  const [connectionStatusText, setConnectionStatusText] = useState('');
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  async function getConnectionInfo() {
    const installed = await isMetaMaskInstalled();
    setIsInstalled(installed);
    if (!installed) return;
    try {
      getAccounts().then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setIsConnected(true);
          setAccountAddress(res[0]);
          setConnectionButtonText(res[0]);
          if (CHAIN_RPC_URLS.has(window.ethereum?.chainId || '')) {
            setConnectionStatusText('');
            setChain(window.ethereum?.chainId || '');
          } else {
            setConnectionStatusText(`
            Note: You are on an unsupported network (${window.ethereum?.chainId}). 
            Please switch to Polygon Mumbai Testnet.`);
          }
        }
      });
    } catch (e) {

    }
  }

  async function connectWallet() {
    try {
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: DEFAULT_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum?.request({
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

    window.ethereum?.request({ method: 'eth_requestAccounts' }).then((res: any) => {
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
    getConnectionInfo();
  }, []);

  useEffect(() => {
    function handleAccountChange() {
      setIsConnected(false);
      getConnectionInfo();
    }

    function handleChainChange(...args: unknown[]) {
      if (accountAddress === '0x') {
        setConnectionStatusText('');
      } else if (!CHAIN_RPC_URLS.has(String(args[0]))) {
        setConnectionStatusText(
          `Note: You are on an unsupported network (${String(args[0])}). 
          Please switch to Polygon Mumbai Testnet.`,
        );
      } else {
        setConnectionStatusText('');
      }
    }

    isMetaMaskInstalled().then((res) => {
      if (!res) return;
      window.ethereum?.on('accountsChanged', handleAccountChange);
      window.ethereum?.on('chainChanged', handleChainChange);
    });
  });

  return [
    accountAddress,
    chain,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ];
}
