import React from 'react';
import Modal from '@mui/material/Modal';
import { PlayerListBox } from '../components/PlayerListBox';
import ActionBox from '../components/ActionBox';
import useMedia from '../hooks/useMedia';

interface GameInfo {
  open: boolean;
  onClose: () => void;
  stake: string;
  playerQueue: string[];
  queuePtr: number;
}

export default function GameInfoBox(props: GameInfo) {
  const {
    open,
    onClose,
    stake,
    playerQueue,
    queuePtr,
  } = props;

  const media = useMedia(1200);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 'em',
        border: '2px solid white',
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        overflow: media ? 'visible' : 'auto',
        flexDirection: media ? 'row' : 'column',
        maxHeight: '1000px',
        maxWidth: '1500px',
        minWidth: 'min(400px, 80vw)',
        minHeight: media ? '800px' : '',
      }}
      >
        <ActionBox
          width={media ? '50%' : '100%'}
          stake={stake}
        />
        <PlayerListBox
          playerQueue={playerQueue}
          queuePtr={queuePtr}
          width={media ? '50%' : '100%'}
          groatIndex={23}
        />
      </div>
    </Modal>
  );
}
