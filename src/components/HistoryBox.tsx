import { Event, utils } from 'ethers';
import React, { useState, useEffect } from 'react';

import Replay from '@mui/icons-material/Replay';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { EVENT_MAP, EVENT_JOIN_HASH, EVENT_LEAVE_HASH } from '../utils/constants';
import { blockDifferenceToTimeDifference } from '../utils/tableCalculations';
import useHover from '../hooks/useHover';

const PAGE_SIZE = 5;

interface historyBox {
  allEvents: Event[];
  numBlocks: number;
  reload: () => void;
  spinning: boolean;
  currentBlockNumber: number;
  chain: string;
}

interface historyRow {
  event: Event;
  currentBlockNumber: number;
  chain: string;
}

function HistoryRow(props: historyRow) {
  const {
    event,
    currentBlockNumber,
    chain,
  } = props;

  const [expanded, setExpanded] = useState(false);

  let addedInfo = ' ';
  if (event.topics[0] === EVENT_JOIN_HASH
        || event.topics[0] === EVENT_LEAVE_HASH) {
    addedInfo += utils.defaultAbiCoder.decode(
      ['uint8'],
      event.data,
    ).toString();
    if (addedInfo === ' 1') {
      addedInfo += ' entry';
    } else {
      addedInfo += ' entries';
    }
  }

  return (
    <div>
      <div
        key={`${event.blockNumber}-${event.logIndex}`}
        style={{
          width: '100%',
          background: 'black',
          color: 'white',
          fontSize: 'min(1.5rem, 4vw)',
          borderBottomStyle: 'solid',
          borderBottomColor: 'dimgray',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{
          width: '40%',
          textAlign: 'left',
          height: '50%',
        }}
        >
          {`${EVENT_MAP.get(event.topics[0])}${addedInfo}`}
        </div>
        <div style={{
          width: '40%',
          textAlign: 'right',
          height: '50%',
        }}
        >
          {blockDifferenceToTimeDifference(event.blockNumber, currentBlockNumber, chain)}
        </div>
        <div
          style={{
            width: '20%',
            textAlign: 'right',
            alignItems: 'center',
            height: '50%',
          }}
        >
          <button
            type="button"
            onClick={() => setExpanded((o) => !o)}
            style={{
              borderRadius: '15px',
              backgroundColor: 'black',
            }}
          >
            <ExpandMore
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                borderRadius: '15px',
                color: 'white',
                cursor: 'pointer',
              }}
            />
          </button>

        </div>

      </div>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          overflowWrap: 'break-word',
          borderStyle: 'solid',
          borderColor: 'dimgray',
          borderTop: 'none',
          padding: '15px',
        }}
      >
        <div>Transaction Hash:</div>
        <div style={{ color: 'dimgray' }}>{event.transactionHash}</div>
        <hr style={{ border: '1px solid dimgray' }} />
        <div>Block Hash:</div>
        <div style={{ color: 'dimgray' }}>{event.blockHash}</div>
        <hr style={{ border: '1px solid dimgray' }} />
        <div>Block Number:</div>
        <div style={{ color: 'dimgray' }}>{event.blockNumber}</div>
      </Collapse>
    </div>
  );
}

export default function HistoryBox(props: historyBox) {
  const {
    allEvents,
    numBlocks,
    reload,
    spinning,
    currentBlockNumber,
    chain,
  } = props;

  const [page, setPage] = useState(1);
  const [rot, setRot] = useState(0);
  const [brightness, cursor, onMouseEnter, onMouseLeave] = useHover();

  const numRowsToDisplay = page * PAGE_SIZE;

  useEffect(() => {
    if (!spinning) return () => undefined;

    const interval = setInterval(() => {
      setRot((old) => (old - 2) % 360);
    }, 2);

    return () => {
      clearInterval(interval);
    };
  }, [spinning]);

  return (
    <div style={{
      overflow: 'auto',
      padding: '15px',
    }}
    >

      <div style={{
        fontSize: 'min(5vw, 1.2rem)',
      }}
      >
        Transaction History
      </div>

      <div style={{
        color: 'dimgray',
      }}
      >
        {`Showing results for the past ${utils.commify(numBlocks)} blocks`}
      </div>
      <br />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <button
          type="button"
          style={{
            background: 'dimgray',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={reload}
        >
          <Replay
            sx={{
              color: 'white',
              transform: `rotate(${rot}deg)`,
            }}
          />
        </button>
      </div>
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {allEvents.slice(0, numRowsToDisplay).map((e) => (
          <HistoryRow
            event={e}
            currentBlockNumber={currentBlockNumber}
            chain={chain}
          />
        ))}
        {numRowsToDisplay < allEvents.length && (
          <button
            type="button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => {
              setPage((oldPage) => oldPage + 1);
            }}
            style={{
              borderRadius: '15px',
              fontSize: '2rem',
              fontFamily: 'Electrolize',
              background: 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%',
              color: 'white',
              cursor: `${cursor}`,
              filter: `brightness(${brightness})`,
            }}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
