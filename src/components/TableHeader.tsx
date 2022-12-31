import React from 'react';
import { TableHeaderColumn, tableHeaderColumn } from './TableHeaderColumn';

const headers: tableHeaderColumn[] = [
  {
    columnName: 'STAKE',
    tooltip: 'The amount of ETH that needs to be deposited to gain a single entry.',
  },
  {
    columnName: 'PROB. OF WINNING',
    tooltip: 'The probability that a single entry will earn its stake back plus the reward.',
  },
  {
    columnName: 'REWARD',
    tooltip: 'The fraction of the stake given to everyone except the scapegroat.',
  },
  {
    columnName: 'PLAYERS',
    tooltip: 'The number of players who are currently waiting and the maximum number of players allowed.',
  },
  {
    columnName: 'COOLDOWN',
    tooltip: 'The amount of time remaining until the scapegroat can be determined.',
  },
];

interface tableHeader {
  height: string;
}

export default function TableHeader(props: tableHeader) {
  const {
    height,
  } = props;
  return (
    <tr
      style={{
        background: 'linear-gradient(47deg, rgba(18,75,117,1) 0%, rgba(9,83,121,1) 44%, rgba(5,72,168,1) 100%)',
        height,
      }}
    >
      {headers.map((header) => (
        <TableHeaderColumn
          key={header.columnName}
          columnName={header.columnName}
          tooltip={header.tooltip}
        />
      ))}
    </tr>
  );
}
