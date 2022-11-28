import { useEffect, useState } from 'react';

const supportedChains = new Set([
  '0x13881', '80001',
]);

function isMetaMaskInstalled() : boolean {
  return Boolean(window.ethereum && window.ethereum.isMetaMask);
}

async function getAccounts() {
  return window.ethereum?.request({ method: 'eth_accounts' });
}

export default function useMetaMaskConnection() : [string, string, string, () => void] {
  const [accountAddress, setAccountAddress] = useState('0x');
  const [connectionButtonText, setConnectionButtonText] = useState('');
  const [connectionStatusText, setConnectionStatusText] = useState('');
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  async function getConnectionInfo() {
    const installed = isMetaMaskInstalled();
    setIsInstalled(installed);
    setConnectionButtonText('Connect Wallet');
    if (!installed) return;
    try {
      getAccounts().then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setIsConnected(true);
          setAccountAddress(res[0]);
          setConnectionButtonText(res[0]);
          if (supportedChains.has(window.ethereum?.networkVersion || '')) {
            setConnectionStatusText('');
          } else {
            setConnectionStatusText('Note: You are on an unsupported network. Please switch to Polygon Mumbai Testnet.');
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
        params: [{ chainId: '0x13881' }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                chainName: 'Mumbai Testnet',
                nativeCurrency: {
                  symbol: 'MATIC',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
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

    window.ethereum?.request({ method: 'eth_requestAccounts' }).then((res) => {
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
      if (!supportedChains.has(String(args[0]))) {
        setConnectionStatusText('Note: You are on an unsupported network. Please switch to Polygon Mumbai Testnet.');
      } else {
        setConnectionStatusText('');
      }
    }

    if (isMetaMaskInstalled()) {
      window.ethereum?.on('accountsChanged', handleAccountChange);
      window.ethereum?.on('chainChanged', handleChainChange);
    }
  });

  return [accountAddress, connectionButtonText, connectionStatusText, connectionButtonOnClick];
}
