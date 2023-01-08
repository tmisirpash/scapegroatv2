import React, { useMemo } from 'react';
import Modal from '@mui/material/Modal';
import { ethers } from 'ethers';
import { PlayerListBox } from '../components/PlayerListBox';
import ActionBox from '../components/ActionBox';
import useMedia from '../hooks/useMedia';

interface GameInfo {
  open: boolean;
  onClose: () => void;
  stake: string;
  playerQueue: string[];
  queuePtr: number;
  accountAddress: string;
  provider: ethers.providers.Provider;
  gameAddress: string;
  openForBusiness: boolean;
  groatIndex: number;
  revealBlockNumber: string;
  maxPlayers: number;
  currentBlockNumber: number;
  chain: string;
}

export default function GameInfoBox(props: GameInfo) {
  const {
    open,
    onClose,
    stake,
    playerQueue,
    queuePtr,
    accountAddress,
    provider,
    gameAddress,
    openForBusiness,
    groatIndex,
    revealBlockNumber,
    maxPlayers,
    currentBlockNumber,
    chain,
  } = props;

  const media = useMedia(1200);

  const [entriesInCurrentGame, entriesInPreviousGame] = useMemo(() => {
    if (accountAddress === '0x') return [0, 0];
    let num1 = 0;
    let num2 = 0;
    for (let i = 0; i < queuePtr; i++) {
      if (playerQueue[i] === accountAddress) num1++;
    }
    for (let i = queuePtr; i < playerQueue.length; i++) {
      if (playerQueue[i] === accountAddress) num2++;
    }
    return [num1, num2];
  }, [playerQueue]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        tabIndex: '-1',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '60%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 'em',
        border: '2px solid white',
        textAlign: 'center',
        padding: '20px',
        paddingBottom: '0',
        display: 'flex',
        overflow: media ? 'visible' : 'auto',
        flexDirection: media ? 'row' : 'column',
        maxHeight: '1000px',
        maxWidth: '1500px',
        minWidth: 'min(400px, 80vw)',
        minHeight: media ? '750px' : '',
      }}
      >
        <ActionBox
          width={media ? '50%' : '100%'}
          stake={stake}
          entriesInCurrentGame={entriesInCurrentGame}
          entriesInPreviousGame={entriesInPreviousGame}
          provider={provider}
          gameAddress={gameAddress}
          openForBusiness={openForBusiness}
          maxPlayers={maxPlayers}
          queuePtr={queuePtr}
          accountAddress={accountAddress}
          currentBlockNumber={currentBlockNumber}
          chain={chain}
        />
        <PlayerListBox
          playerQueue={playerQueue}
          queuePtr={queuePtr}
          width={media ? '50%' : '100%'}
          groatIndex={groatIndex}
          accountAddress={accountAddress}
          revealBlockNumber={revealBlockNumber}
        />
      </div>
    </Modal>
  );
}
