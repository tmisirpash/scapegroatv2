import React from 'react';

import fox from '../../dist/images/MetaMask_Fox.png';

const ConnectWalletButton: React.FC = () => (
  <div style={{
    width: '175px',
    borderRadius: '20px',

    background: 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%)',

    padding: '10px',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    color: 'white',

  }}
  >
    <img src={fox} width="50" height="50" className="undraggable unselectable" alt="" />
    <div className="unselectable">Connect Wallet</div>
  </div>
);

export default ConnectWalletButton;
