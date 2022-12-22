import React from 'react';
import Modal from '@mui/material/Modal';
import { BigNumber } from 'ethers';
import { PlayerListBox } from '../components/PlayerListBox';
import ActionBox from '../components/ActionBox';
import useMedia from '../hooks/useMedia';

interface GameInfo {
  gameAddress: string;
  open: boolean;
  onClose: () => void;
  groatIndex: number;
  groatAddress: string;
  stake: BigNumber;
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
    groatIndex,
    groatAddress,
    stake,
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
        maxWidth: '1500px',
        minWidth: 'min(400px, 80vw)',
        minHeight: media ? '800px' : '',
      }}
      >
        <ActionBox
          gameAddress={gameAddress}
          width={media ? '50%' : '100%'}
          groatIndex={groatIndex}
          groatAddress={groatAddress}
          stake={stake}
        />
        <PlayerListBox
          addressQueue={addressQueue}
          queuePtr={queuePtr}
          width={media ? '50%' : '100%'}
          groatIndex={groatIndex}
        />
      </div>
    </Modal>
  );
}
