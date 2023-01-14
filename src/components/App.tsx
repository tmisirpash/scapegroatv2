import React from 'react';
import TopBar from './TopBar';
import useMetaMaskConnection from '../hooks/useMetaMaskConnection';
import ConnectionStatus from '../modals/ConnectionStatus';
import Content from './Content';
import Footer from './Footer';

const App: React.FC = () => {
  const [
    prov,
    accountAddress,
    chain,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  return (
    <div style={{
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
      <div>
        <TopBar
          connectionButtonText={connectionButtonText}
          connectionButtonOnClick={connectionButtonOnClick}
        />
        <ConnectionStatus
          connectionStatusText={connectionStatusText}
        />

        <Content
          chain={chain}
          accountAddress={accountAddress}
          prov={prov}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
