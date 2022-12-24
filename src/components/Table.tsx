import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import useGetBlockNumber from '../hooks/useGetBlockNumber';
import { useGetTopLevelGameInfo } from '../hooks/useGetTopLevelGameInfo';
import useRpcProvider from '../hooks/useRpcProvider';

const rowHeight = '80px';

interface table {
  chain: string;
}

export default function Table(props: table) {
  const {
    chain,
  } = props;

  const provider = useRpcProvider(chain);
  const currentBlockNumber = useGetBlockNumber(provider);
  const gameInfo = useGetTopLevelGameInfo(provider, chain);

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
          {gameInfo.map((g) => (
            <TableRow
              key={g.gameAddress}
              chain={chain}
              gameAddress={g.gameAddress}
              stake={g.stake}
              maxPlayers={g.maxPlayers}
              height={rowHeight}
              currentBlockNumber={currentBlockNumber}
              provider={provider}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
