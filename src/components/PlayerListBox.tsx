import React from 'react';
import useMedia from '../hooks/useMedia';

export interface playerListBox {
  addressQueue: string[];
  queuePtr: number;
  width: string;
  groatIndex: number;
}

export function PlayerListBox(props: playerListBox) {
  const {
    addressQueue,
    queuePtr,
    width,
    groatIndex,
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
            <th style={{ textAlign: 'center' }}>Player Address</th>
            {media && <th>Position in Line</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ visibility: 'hidden' }}>0x</td>
            {media && <td style={{ visibility: 'hidden' }}>-1</td>}
          </tr>
          {addressQueue.map((a, i) => (
            <tr
              className={i === queuePtr ? 'blinkingBackground' : ''}
              style={{
                borderBottomStyle: 'solid',
                borderBottomColor: '#303030',
              }}
            >
              <td
                style={{
                  color: i < queuePtr ? 'white' : (i === groatIndex ? 'green' : 'dimgray'),
                  textAlign: 'center',
                }}
              >
                {`${a.slice(0, 10)}...`}
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
