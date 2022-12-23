import React, { useState } from 'react';
import { utils, BigNumber } from 'ethers';
import TableRowColumn from './TableRowColumn';
import TableRowColumnNoTooltip from './TableRowColumnNoTooltip';
import { getProbabilityOfWinning, getReward, getCooldown } from '../utils/tableCalculations';
import RowExpandButton from './RowExpandButton';
import GameInfoBox from '../modals/GameInfoBox';
import useGetTopLevelGameInfo from '../hooks/useGetTopLevelGameInfo';

interface tableRow {
  gameAddress: string;
  chain: string;
  height: string;
  currentBlockNumber: number;
}

export default function TableRow(props: tableRow) {
  const {
    gameAddress,
    chain,
    height,
    currentBlockNumber,
  } = props;

  const [
    stake,
    maxPlayers,
    queuePtr,
    revealBlockNumber,
    loading,
  ] = useGetTopLevelGameInfo(gameAddress, chain);
  const [
    blocks,
    tooltip,
  ] = getCooldown(BigNumber.from(revealBlockNumber), BigNumber.from(currentBlockNumber), chain);
  const [modalOpen, setModalOpen] = useState(false);

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
    !loading ? (
      <tr style={{
        height,
        backgroundColor: '#18283b',
        color: 'white',
      }}
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
          value={`${queuePtr} / ${maxPlayers}`}
          className={className}
        />
        <TableRowColumn
          value={blocks}
          tooltip={tooltip}
          className={className}
        />
        <td>
          <RowExpandButton
            updateModalOpen={() => {
              setModalOpen(true);
            }}
          />
        </td>
        <GameInfoBox
          gameAddress={gameAddress}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          stake={stake}
        />
      </tr>
    ) : <tr />
  );
}
