import React from 'react';
import { ethers } from 'ethers';
import useMedia from '../hooks/useMedia';
import { DEAD_ADDRESS } from '../utils/constants';

export interface playerListBox {
  playerQueue: string[];
  queuePtr: number;
  width: string;
  groatIndex: number;
  accountAddress: string;
  revealBlockNumber: string;
}

export function PlayerListBox(props: playerListBox) {
  const {
    playerQueue,
    queuePtr,
    width,
    groatIndex,
    accountAddress,
    revealBlockNumber,
  } = props;

  const media = useMedia(700);

  return (
    <div
      style={{
        padding: '20px',
        width,
        float: 'right',
        fontSize: '1.5rem',
        boxSizing: 'border-box',
        overflow: width === '100%' ? 'visible' : 'auto',
      }}
      /* eslint-disable */
      tabIndex={width === '100%' ? -1 : 0}
      /* eslint-enable */
    >
      <table style={{
        width: '100%',
      }}
      >
        <thead>
          <tr style={{
            color: 'cyan',
          }}
          >
            <th style={{ textAlign: 'center' }}>{media ? 'Previous Round' : 'Player Addresses'}</th>
            {media && <th>Current Round</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ visibility: 'hidden' }}>0x</td>
            {media && <td style={{ visibility: 'hidden' }}>-1</td>}
          </tr>

          {media && playerQueue.slice(0, queuePtr).map((a) => (
            <tr style={{
              borderBottomStyle: 'solid',
              borderBottomColor: '#303030',
            }}
            >
              <td style={{ color: 'dimgray' }}>
                -
              </td>
              <td style={{
                color: 'white',
                textAlign: 'center',
              }}
              >
                {`${(a === DEAD_ADDRESS || a === ethers.constants.AddressZero ? '-' : `${a.slice(0, 10)}...`)}
                  ${a === accountAddress ? '(you)' : ''}`}
              </td>
            </tr>
          ))}

          {media && playerQueue.slice(queuePtr, playerQueue.length).map((a, i) => (
            <tr
              className={i === 0 ? 'blinkingBackground' : ''}
              style={{
                borderBottomStyle: 'solid',
                borderBottomColor: '#303030',
              }}
            >
              <td style={{
                color: i + queuePtr === groatIndex
                    && revealBlockNumber.toString() !== '1'
                    && queuePtr !== 0
                  ? 'green' : 'dimgray',
                textAlign: 'center',
              }}
              >
                {`${(a === DEAD_ADDRESS || a === ethers.constants.AddressZero ? '-' : `${a.slice(0, 10)}...`)}
                  ${a === accountAddress ? '(you)' : ''}`}
              </td>
              <td style={{ color: 'dimgray' }}>
                -
              </td>
            </tr>
          ))}

          {!media && (playerQueue.map((a, i) => (
            <tr
              className={i === queuePtr ? 'blinkingBackground' : ''}
              style={{
                borderBottomStyle: 'solid',
                borderBottomColor: '#303030',
              }}
            >
              <td style={{
                color: i < queuePtr ? 'white'
                  : (i === groatIndex
                    && revealBlockNumber.toString() !== '1'
                    && queuePtr !== 0
                    ? 'green' : 'dimgray'),
              }}
              >
                {`${(a === DEAD_ADDRESS || a === ethers.constants.AddressZero ? '-' : `${a.slice(0, 10)}...`)}
                  ${a === accountAddress ? '(you)' : ''}`}
              </td>
            </tr>
          )))}

        </tbody>
      </table>
    </div>
  );
}
