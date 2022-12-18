import React from 'react';
import TableHeader from './TableHeader';
import groatGame from '../interfaces/groatGame';
import TableRow from './TableRow';
import useGetBlockNumber from '../hooks/useGetBlockNumber';

interface table {
  games: groatGame[]
}

const rowHeight = '80px';

export default function Table(props: table) {
  const {
    games,
  } = props;

  const currentBlockNumber = useGetBlockNumber();

  return (
    <div style={{
      overflow: 'auto',
      tableLayout: 'fixed',
    }}
    >
      <table>
        <thead>
          <TableHeader
            height={rowHeight}
          />
        </thead>
        <tbody>
          {games.map((g) => (
            <TableRow
              key={g.address}
              address={g.address}
              stake={g.stake}
              players={g.players}
              revealBlockNumber={g.revealBlockNumber}
              queuePtr={g.queuePtr}
              height={rowHeight}
              currentBlockNumber={currentBlockNumber}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
