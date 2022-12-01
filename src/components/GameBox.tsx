import React from 'react';
import PlayerCountBox from './PlayerCountBox';

interface gameBox {
  media: boolean;
}
export default function GameBox(props: gameBox) {
  const {
    media,
  } = props;
  const [playerCount, setPlayerCount] = React.useState('101');
  const updatePlayerCount = (param: string) => {
    if (/[0-9]+/.test(param)) {
      setPlayerCount(param);
    }
  };

  return (
    <div>
      <PlayerCountBox
        playerCount={playerCount}
        updatePlayerCount={updatePlayerCount}
        media={media}
      />
    </div>
  );
}
