import React from 'react';
import Modal from '@mui/material/Modal';
import { PlayerListBox } from '../components/PlayerListBox';
import ActionBox from '../components/ActionBox';
import useMedia from '../hooks/useMedia';

interface GameInfo {
  gameAddress: string;
  open: boolean;
  onClose: () => void;
}

const queuePtr = 24;

function getPlayerQueue() : string[] {
  const result: string[] = [];

  for (let i = 0; i < 51; i++) {
    result.push(`0x00004567${i}`);
  }
  return result;
}

const addressQueue: string[] = getPlayerQueue();

export default function GameInfoBox(props: GameInfo) {
  const {
    open,
    onClose,
    gameAddress,
  } = props;

  const media = useMedia(1500);

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
      }}
      >
        <ActionBox
          gameAddress={gameAddress}
          width={media ? '50%' : '100%'}
        />
        <PlayerListBox
          addressQueue={addressQueue}
          queuePtr={queuePtr}
          width={media ? '50%' : '100%'}
        />
      </div>
    </Modal>
  );
}
