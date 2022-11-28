import React from 'react';
import Title from './Title';
import ConnectWalletButton from './ConnectWalletButton';
import ConnectionStatus from './ConnectionStatus';

interface topBar {
  connectionButtonText: string;
  connectionButtonOnClick: () => void;
  connectionStatusText: string;
}

const TopBar = (
  props: topBar,
) => {
  const {
    connectionButtonText,
    connectionButtonOnClick,
    connectionStatusText,
  } = props;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    >
      <Title />
      <ConnectionStatus
        connectionStatusText={connectionStatusText}
      />
      <ConnectWalletButton
        connectionButtonText={connectionButtonText}
        connectionButtonOnClick={connectionButtonOnClick}
      />
    </div>
  );
};

export default TopBar;
