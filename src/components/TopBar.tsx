import React from 'react';
import Title from './Title';
import ConnectWalletButton from './ConnectWalletButton';
import useMedia from '../hooks/useMedia';

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

  const media = useMedia(400);

  return (
    <div style={{
      display: 'flex',
      flexDirection: media ? 'row' : 'column',
      justifyContent: media ? 'space-between' : 'center',
      alignItems: 'center',
      background: 'black',
      width: '100%',
      height: media ? '75px' : '120px',
    }}
    >
      <Title
        media={media}
      />
      <ConnectWalletButton
        connectionButtonText={connectionButtonText}
        connectionButtonOnClick={connectionButtonOnClick}
        media={media}
      />
    </div>
  );
};

export default TopBar;
