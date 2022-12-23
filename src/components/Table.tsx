import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import useGetBlockNumber from '../hooks/useGetBlockNumber';
import { KNOWN_ADDRESSES } from '../utils/constants';

const rowHeight = '80px';

const EMPTY_LIST: string[] = [];

interface table {
  chain: string;
}

export default function Table(props: table) {
  const {
    chain,
  } = props;

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
          {(KNOWN_ADDRESSES.get(chain) || EMPTY_LIST).map((g) => (
            <TableRow
              key={g}
              chain={chain}
              gameAddress={g}
              height={rowHeight}
              currentBlockNumber={currentBlockNumber}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
