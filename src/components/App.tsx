import React from 'react';
import TopBar from './TopBar';
import useMetaMaskConnection from '../hooks/useMetaMaskConnection';
import ConnectionStatus from './ConnectionStatus';

const App: React.FC = () => {
  const [
    ,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  return (
    <div>
      <TopBar
        connectionButtonText={connectionButtonText}
        connectionButtonOnClick={connectionButtonOnClick}
      />
      <br />
      <ConnectionStatus
        connectionStatusText={connectionStatusText}
      />
    </div>
  );
};

export default App;
