import React from 'react';
import TopBar from './TopBar';
import useMetaMaskConnection from '../hooks/useMetaMaskConnection';

const App: React.FC = () => {
  const [
    ,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  return (
    <TopBar
      connectionButtonText={connectionButtonText}
      connectionButtonOnClick={connectionButtonOnClick}
      connectionStatusText={connectionStatusText}
    />
  );
};

export default App;
