import React from 'react';
import TopBar from './TopBar';
import { useMetaMaskConnection } from '../hooks/useMetaMaskConnection';
import ConnectionStatus from '../modals/ConnectionStatus';
import Table from './Table';

const App: React.FC = () => {
  const [
    accountAddress,
    chain,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  return (
    <div style={{
      height: '100%',
    }}
    >
      <TopBar
        connectionButtonText={connectionButtonText}
        connectionButtonOnClick={connectionButtonOnClick}
      />
      <ConnectionStatus
        connectionStatusText={connectionStatusText}
      />
      <br />
      <br />
      <br />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Table
          chain={chain}
          accountAddress={accountAddress}
        />
      </div>
    </div>
  );
};

export default App;
