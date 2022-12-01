import React from 'react';
import { DebounceInput } from 'react-debounce-input';

interface playerCountBox {
  updatePlayerCount: (param: string) => void;
  media: boolean;
}

export default function PlayerCountBox(props: playerCountBox) {
  const {
    updatePlayerCount,
    media,
  } = props;

  const flexDir = !media ? 'column' : 'row';

  return (
    <div>
      <div style={{
        color: 'lightgray',
        fontSize: '3rem',
        display: 'flex',
        flexDirection: flexDir,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <span style={{
          textAlign: 'center',
        }}
        >
          Showing games with
        </span>
        <DebounceInput
          debounceTimeout={1000}
          maxLength={3}
          onChange={(event) => updatePlayerCount(event.target.value)}
          style={{
            height: '3rem',
            width: '6rem',
            fontSize: '3rem',
            color: 'cyan',
            fontFamily: 'Electrolize',
            margin: '15px',
            backgroundColor: 'transparent',
            textAlign: 'center',
            borderColor: 'cyan',
          }}
        />
        <span style={{
          textAlign: 'center',
        }}
        >
          {' '}
          players.
        </span>
      </div>
    </div>
  );
}
