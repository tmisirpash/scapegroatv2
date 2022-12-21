import React from 'react';

export interface playerListBox {
  addressQueue: string[];
  queuePtr: number;
}

export function PlayerListBox(props: playerListBox) {
  const {
    addressQueue,
    queuePtr,
  } = props;

  return (
    <div
      style={{
        padding: '20px',
        width: '50%',
        float: 'right',
        fontSize: '1.5rem',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <table style={{
        overflow: 'auto',
        width: '100%',
      }}
      >
        <thead>
          <tr style={{ color: 'cyan' }}>
            <th>Player Address</th>
            <th>Position in Line</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ visibility: 'hidden' }}>0x</td>
            <td style={{ visibility: 'hidden' }}>-1</td>
          </tr>
          {addressQueue.map((a, i) => (
            <tr
              className={i === queuePtr ? 'blinkingBackground' : ''}
              style={{
                borderBottomStyle: 'solid',
                borderBottomColor: '#303030',
              }}
            >
              <td style={{ color: i < queuePtr ? 'white' : 'dimgray' }}>{a}</td>
              {i < queuePtr && <td>{i + 1}</td>}
              {i === queuePtr && <td style={{ fontSize: '0' }}>-1</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
