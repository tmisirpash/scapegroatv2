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
            <th style={{ textAlign: 'center' }}>{media ? 'Player Address' : 'Player Addresses'}</th>
            {media && <th>Position in Line</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ visibility: 'hidden' }}>0x</td>
            {media && <td style={{ visibility: 'hidden' }}>-1</td>}
          </tr>
          {playerQueue.map((a, i) => (
            <tr
              className={i === queuePtr ? 'blinkingBackground' : ''}
              style={{
                borderBottomStyle: 'solid',
                borderBottomColor: '#303030',
              }}
            >
              <td
                style={{
                  color: i < queuePtr ? 'white' : (i === groatIndex && revealBlockNumber.toString() !== '1' ? 'green' : 'dimgray'),
                  textAlign: 'center',
                }}
              >
                {`${(a === DEAD_ADDRESS ? ethers.constants.AddressZero : a)
                  .slice(0, 10)}... ${a === accountAddress ? '(you)' : ''}`}
              </td>
              {(media && i < queuePtr) && <td>{i + 1}</td>}
              {(media && i === queuePtr) && <td style={{ fontSize: '0' }}>-1</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
