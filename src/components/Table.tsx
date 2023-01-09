import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import useGetBlockNumber from '../hooks/useGetBlockNumber';
import { useGetTopLevelGameInfo } from '../hooks/useGetTopLevelGameInfo';
import useRpcProvider from '../hooks/useRpcProvider';
import { useGetTableLiveUpdate } from '../hooks/useGetTableLiveUpdate';
import useMedia from '../hooks/useMedia';

interface table {
  chain: string;
  accountAddress: string;
}

export default function Table(props: table) {
  const {
    chain,
    accountAddress,
  } = props;

  const provider = useRpcProvider(chain, accountAddress);
  const currentBlockNumber = useGetBlockNumber(provider);
  const [gameInfo, loading1] = useGetTopLevelGameInfo(provider, chain);
  const [liveInfo, loading2] = useGetTableLiveUpdate(provider, chain);

  const media = useMedia(1200);

  const fontSize = media ? '2rem' : '1rem';
  const rowHeight = media ? '80px' : '40px';

  return (
    (!loading1 && !loading2) ? (
      <div
        className="paddingBetweenCols mainTable"
        style={{
          overflow: 'auto',
        }}
      >
        <table style={{
          minWidth: '740px',
        }}
        >
          <thead>
            <TableHeader
              height={rowHeight}
              fontSize={fontSize}
            />
          </thead>
          <tbody>
            {gameInfo.map((g, i) => (
              <TableRow
                key={g.gameAddress}
                accountAddress={accountAddress}
                chain={chain}
                gameAddress={g.gameAddress}
                stake={g.stake}
                maxPlayers={g.maxPlayers}
                queuePtr={liveInfo[i].queuePtr}
                revealBlockNumber={liveInfo[i].revealBlockNumber}
                height={rowHeight}
                currentBlockNumber={currentBlockNumber}
                provider={provider}
                fontSize={fontSize}
              />
            ))}
          </tbody>
        </table>
      </div>
    ) : <div />
  );
}
