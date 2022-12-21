import React from 'react';
import Modal from '@mui/material/Modal';
import { PlayerListBox } from '../components/PlayerListBox';

interface GameInfo {
  gameAddress: string;
  open: boolean;
  onClose: () => void;
}

const queuePtr = 24;

function getPlayerQueue() : string[] {
  const result: string[] = [];

  for (let i = 0; i < 51; i++) {
    result.push(`0x00000004567${i}`);
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
        width: '70%',
        height: '70%',
        overflow: 'auto',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 'em',
        border: '2px solid white',
        textAlign: 'center',
        padding: '20px',
      }}
      >
        {gameAddress}
        <PlayerListBox
          addressQueue={addressQueue}
          queuePtr={queuePtr}
        />
      </div>
    </Modal>
  );
}
