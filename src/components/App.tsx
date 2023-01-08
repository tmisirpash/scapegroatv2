import React from 'react';
import TopBar from './TopBar';
import { useMetaMaskConnection } from '../hooks/useMetaMaskConnection';
import ConnectionStatus from '../modals/ConnectionStatus';
import Table from './Table';
import goat from '../../dist/images/astrogoat2.png';
import useMedia from '../hooks/useMedia';

const App: React.FC = () => {
  const [
    accountAddress,
    chain,
    connectionButtonText,
    connectionStatusText,
    connectionButtonOnClick,
  ] = useMetaMaskConnection();

  const media = useMedia(1200);

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

      <div style={{
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'move-twink-back 200s linear infinite',
        background: '#1F305E url(/images/stars.png) repeat top center',
        paddingTop: '50px',
      }}
      >
        <img
          src={goat}
          width={media ? '1200px' : '100%'}
          alt=""
        />
      </div>
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '3rem',
        }}
        >
          <div style={{
            paddingTop: '50px',
          }}
          >
            How to Play
          </div>
          <ol style={{
            fontSize: 'min(2rem, 5vw)',
            width: 'min(75%, 1000px)',
          }}
          >
            <li>
              {
                `Connect your wallet and choose a game to enter below.
              The stake is the amount of ETH you need to gain a single entry.`
              }
            </li>
            <br />
            <li>
              {`You are free to add and remove entries as long as the game has
              not been filled. Once the number of players reaches the maximum, the game is put
              in a cooldown period during which all entries are locked in.`}
            </li>
            <br />
            <li>
              {`After the cooldown period, one player is randomly chosen as
              the "scapegroat", and they lose the entirety of their stake.
              All other players get their own stake back in addition to an equal
              share of the scapegroat's stake.`}
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
          paddingTop: '50px',
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
