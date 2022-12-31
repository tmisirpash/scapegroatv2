import React from 'react';
import TopBar from './TopBar';
import { useMetaMaskConnection } from '../hooks/useMetaMaskConnection';
import ConnectionStatus from '../modals/ConnectionStatus';
import Table from './Table';

const App: React.FC = () => {
  const [
    accountAddress,
    chain,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  return (
    <div style={{
      height: '100%',
    }}
    >
      <TopBar
        connectionButtonText={connectionButtonText}
        connectionButtonOnClick={connectionButtonOnClick}
      />
      <ConnectionStatus
        connectionStatusText={connectionStatusText}
      />
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '3rem',
          paddingTop: '50px',
        }}
        >
          How to Play
          <ol style={{
            fontSize: 'min(2rem, 5vw)',
            width: 'min(75%, 1000px)',
          }}
          >
            <li>
              {
                `Connect your wallet and choose a game to enter below.
              The stake is the amount you need to gain a single entry.`
              }
            </li>
            <br />
            <li>
              {`You are free to add and remove entries as long as the game has
              not been filled. Once all players have joined, the game is put
              in a cooldown period.`}
            </li>
            <br />
            <li>
              {`After the cooldown period, one player is randomly chosen as
              the "scapegroat", and they lose the entirety of their stake.
              All other players get their stake back in addition to an equal
              share of the scapegroat's loss.`}
            </li>
            <br />
            <li>
              {'So, what are you waiting for? Don\'t be an antisocial antelope!'}
            </li>
          </ol>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
        >
          <Table
            chain={chain}
            accountAddress={accountAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
