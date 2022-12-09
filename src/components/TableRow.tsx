import React from 'react';
import { utils, BigNumber } from 'ethers';
import groatGame from '../interfaces/groatGame';
import TableRowColumn from './TableRowColumn';
import { getProbabilityOfWinning, getReward, getCooldown } from '../utils/tableCalculations';

interface tableRow extends groatGame {
  height: string;
  currentBlockNumber: number;
}

export default function TableRow(props: tableRow) {
  const {
    stake,
    players,
    queuePtr,
    revealBlockNumber,
    height,
    currentBlockNumber,
  } = props;

  const [blocks, tooltip] = getCooldown(revealBlockNumber, BigNumber.from(currentBlockNumber));

  return (
    <tr style={{
      height,
      backgroundColor: '#18283b',
      color: 'white',
    }}
    >
      <TableRowColumn value={`${utils.formatEther(stake)} ETH`} />
      <TableRowColumn value={`${getProbabilityOfWinning(players)}%`} />
      <TableRowColumn value={`${utils.formatEther(getReward(players, stake))} ETH`} />
      <TableRowColumn value={`${queuePtr} / ${players}`} />
      <TableRowColumn value={blocks} tooltip={tooltip} />
    </tr>
  );
}
