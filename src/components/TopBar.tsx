import React from 'react';
import Title from './Title';
import ConnectWalletButton from './ConnectWalletButton';

const TopBar: React.FC = () => (
  <div style={{
    // borderColor: "goldenrod",
    // borderStyle: "solid",

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
  >
    <Title />
    <ConnectWalletButton />
  </div>
);

export default TopBar;
