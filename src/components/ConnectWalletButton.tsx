import React from 'react';
import fox from '../../dist/images/MetaMask_Fox.png';
import useHover from '../hooks/useHover';

interface connectWalletButton {
  connectionButtonText: string;
  connectionButtonOnClick: () => void;
}
function ConnectWalletButton(props: connectWalletButton) {
  const {
    connectionButtonText,
    connectionButtonOnClick,
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
        height: '100%',
        width: '150px',
        borderRadius: '20px',
        filter: `brightness(${brightness})`,
        background: 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%',
        transitionDuration: '100ms',
        cursor: `${cursor}`,
        padding: '10px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Electrolize',
      }}
    >
      <img src={fox} width="50" height="50" className="undraggable unselectable" alt="" />
      <span className="unselectable">{connectionText}</span>
    </button>
  );
}

export default ConnectWalletButton;
