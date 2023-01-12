import React from 'react';
import useHover from '../hooks/useHover';

interface connectWalletButton {
  connectionButtonText: string;
  connectionButtonOnClick: () => void;
  media: boolean;
}
function ConnectWalletButton(props: connectWalletButton) {
  const {
    connectionButtonText,
    connectionButtonOnClick,
    media,
  } = props;
  const [brightness, cursor, onMouseEnter, onMouseLeave] = useHover();

  let connectionText = connectionButtonText;
  if (connectionButtonText !== 'Connect Wallet') {
    connectionText = `${connectionText.substring(0, 10)}...`;
  }

  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={connectionButtonOnClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          connectionButtonOnClick();
        }
      }}
      style={{
        height: '40px',
        width: '160px',
        borderRadius: '20px',
        filter: `brightness(${brightness})`,
        background: 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%',
        transitionDuration: '100ms',
        cursor: `${cursor}`,
        padding: '10px',
        margin: media ? '15px' : '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Electrolize',
        border: 'none',
      }}
    >
      <span className="unselectable">{connectionText}</span>
    </button>
  );
}

export default ConnectWalletButton;
