import React from 'react';
import Title from './Title';
import ConnectWalletButton from './ConnectWalletButton';

interface topBar {
  connectionButtonText: string;
  connectionButtonOnClick: () => void;
}

const TopBar = (
  props: topBar,
) => {
  const {
    connectionButtonText,
    connectionButtonOnClick,
  } = props;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'black',
      width: '100%',
    }}
    >
      <Title />
      <ConnectWalletButton
        connectionButtonText={connectionButtonText}
        connectionButtonOnClick={connectionButtonOnClick}
      />
    </div>
  );
};

export default TopBar;
