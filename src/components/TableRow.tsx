import React, { useState } from 'react';
import { utils, BigNumber, ethers } from 'ethers';
import TableRowColumn from './TableRowColumn';
import TableRowColumnNoTooltip from './TableRowColumnNoTooltip';
import { getProbabilityOfWinning, getReward, getCooldown } from '../utils/tableCalculations';
import GameInfoBox from '../modals/GameInfoBox';
import useGetPlayerQueue from '../hooks/useGetPlayerQueue';
import useHover from '../hooks/useHover';

interface tableRow {
  stake: string;
  accountAddress: string;
  maxPlayers: number;
  queuePtr: number;
  revealBlockNumber: string;
  gameAddress: string;
  chain: string;
  height: string;
  currentBlockNumber: number;
  provider: ethers.providers.Provider;
}

export default function TableRow(props: tableRow) {
  const {
    stake,
    accountAddress,
    maxPlayers,
    queuePtr,
    revealBlockNumber,
    gameAddress,
    chain,
    height,
    currentBlockNumber,
    provider,
  } = props;

  const [brightness, cursor, onMouseEnter, onMouseLeave] = useHover();

  const [modalOpen, setModalOpen] = useState(false);
  const [playerQueue, groatIndex, queuePtrPlayerQueue] = useGetPlayerQueue(
    provider,
    gameAddress,
    maxPlayers,
    modalOpen,
    chain,
  );

  const [
    blocks,
    tooltip,
  ] = getCooldown(BigNumber.from(revealBlockNumber), BigNumber.from(currentBlockNumber), chain);

  const openForBusiness = currentBlockNumber >= Number(revealBlockNumber);

  const queuePtrReset = (queuePtr === maxPlayers && openForBusiness) ? 0 : queuePtr;
  const queuePtrPlayerQueueReset = (queuePtrPlayerQueue === maxPlayers && openForBusiness)
    ? 0 : queuePtrPlayerQueue;

  const className = blocks === 'Open' ? '' : 'blinkingText';

  let stakeFontSize = '2rem';
  let rewardFontSize = '2rem';

  let displayStake = utils.commify(utils.formatEther(BigNumber.from(stake)));
  let displayReward = utils.commify(utils.formatEther(
    getReward(maxPlayers, BigNumber.from(stake)),
  ));

  const stakePeriod = displayStake.indexOf('.');
  const rewardPeriod = displayReward.indexOf('.');

  displayStake = stakePeriod > 4 ? displayStake.substring(0, displayStake.indexOf('.')) : displayStake;
  displayReward = rewardPeriod > 4 ? displayReward.substring(0, displayReward.indexOf('.')) : displayReward;

  displayStake = /^[0]*$/.test(displayStake.slice(stakePeriod + 1)) ? displayStake.slice(0, stakePeriod) : displayStake;
  displayReward = /^[0]*$/.test(displayReward.slice(rewardPeriod + 1)) ? displayReward.slice(0, rewardPeriod) : displayReward;

  if (displayStake.length > 10) {
    stakeFontSize = '1rem';
  }

  if (displayReward.length > 10) {
    rewardFontSize = '1rem';
  }

  return (
    <tr
      style={{
        height,
        backgroundColor: '#18283b',
        color: 'white',
        cursor: `${cursor}`,
        filter: `brightness(${brightness})`,
      }}
      onClick={() => {
        if (!modalOpen) setModalOpen(true);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TableRowColumnNoTooltip
        value={`${displayStake} ⟠`}
        fontSize={stakeFontSize}
        decimal
      />
      <TableRowColumnNoTooltip
        value={`${getProbabilityOfWinning(maxPlayers)}%`}
        decimal
      />
      <TableRowColumnNoTooltip
        value={`${displayReward} ⟠`}
        fontSize={rewardFontSize}
        decimal
      />
      <TableRowColumnNoTooltip
        value={`${queuePtrReset} / ${maxPlayers}`}
        className={className}
      />
      <TableRowColumn
        value={blocks}
        tooltip={tooltip}
        className={className}
      />
      <GameInfoBox
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        stake={stake}
        playerQueue={playerQueue}
        accountAddress={accountAddress}
        provider={provider}
        gameAddress={gameAddress}
        openForBusiness={openForBusiness}
        groatIndex={groatIndex}
        revealBlockNumber={revealBlockNumber}
        maxPlayers={maxPlayers}
        queuePtr={queuePtrPlayerQueueReset}
        currentBlockNumber={currentBlockNumber}
        chain={chain}
      />
    </tr>
  );
}
