import React from 'react';
import { BigNumber } from 'ethers';
import Table from './Table';
import groatGame from '../interfaces/groatGame';

const seededState: groatGame[] = [
  {
    address: '0x1',
    stake: BigNumber.from('1000000000000000000'),
    players: 101,
    queuePtr: 32,
    revealBlockNumber: BigNumber.from('30000000'),
  },
  {
    address: '0x2',
    stake: BigNumber.from('500000000000000000'),
    players: 51,
    queuePtr: 23,
    revealBlockNumber: BigNumber.from('13000000'),
  },
];

export default function PaginatedTable() {
  return (
    <div
      className="paddingBetweenCols"
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Table
        games={seededState}
      />
    </div>
  );
}