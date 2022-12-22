import React from 'react';
import { BigNumber } from 'ethers';
import TableHeader from './TableHeader';
import groatGame from '../interfaces/groatGame';
import TableRow from './TableRow';
import useGetBlockNumber from '../hooks/useGetBlockNumber';

function seedArray() : groatGame[] {
  const a : groatGame[] = [
    {
      address: '0x1',
      stake: BigNumber.from('500000000000000000'),
      players: 51,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x2',
      stake: BigNumber.from('500000000000000000'),
      players: 101,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x3',
      stake: BigNumber.from('1000000000000000000'),
      players: 51,
      queuePtr: 12,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x4',
      stake: BigNumber.from('1000000000000000000'),
      players: 101,
      queuePtr: 45,
      revealBlockNumber: BigNumber.from('20000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x5',
      stake: BigNumber.from('5000000000000000000'),
      players: 51,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x6',
      stake: BigNumber.from('5000000000000000000'),
      players: 101,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x7',
      stake: BigNumber.from('10000000000000000000'),
      players: 51,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x8',
      stake: BigNumber.from('10000000000000000000'),
      players: 101,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0x9',
      stake: BigNumber.from('50000000000000000000'),
      players: 51,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },
    {
      address: '0xa',
      stake: BigNumber.from('50000000000000000000'),
      players: 101,
      queuePtr: 11,
      revealBlockNumber: BigNumber.from('30000000'),
      groatIndex: 27,
      groatAddress: '0x1234567',
    },

  ];

  return a;
}

const seededState: groatGame[] = seedArray();

const rowHeight = '80px';

export default function Table() {
  const currentBlockNumber = useGetBlockNumber();

  return (
    <div
      className="paddingBetweenCols mainTable"
      style={{
        overflow: 'auto',
      }}
    >
      <table>
        <thead>
          <TableHeader
            height={rowHeight}
          />
        </thead>
        <tbody>
          {seededState.map((g) => (
            <TableRow
              key={g.address}
              address={g.address}
              stake={g.stake}
              players={g.players}
              revealBlockNumber={g.revealBlockNumber}
              queuePtr={g.queuePtr}
              height={rowHeight}
              currentBlockNumber={currentBlockNumber}
              groatIndex={g.groatIndex}
              groatAddress={g.groatAddress}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
