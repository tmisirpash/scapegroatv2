import React from 'react';
import TopBar from './TopBar';
import useMetaMaskConnection from '../hooks/useMetaMaskConnection';
import ConnectionStatus from '../modals/ConnectionStatus';
import GameBox from './GameBox';
import useMedia from '../hooks/useMedia';

const App: React.FC = () => {
  const [
    ,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  const media = useMedia();

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
      <GameBox
        media={media}
      />
    </div>
  );
};

export default App;
