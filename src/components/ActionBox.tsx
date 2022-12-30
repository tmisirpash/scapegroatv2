import React, { useState, useEffect, useCallback } from 'react';
import { ethers, Event } from 'ethers';
import { hexZeroPad } from 'ethers/lib/utils';
import EnterLeaveBox from './EnterLeaveBox';
import ActionBoxTabs from './ActionBoxTabs';
import HistoryBox from './HistoryBox';
import groatABI from '../../dist/Groat.json';
import { EVENT_LIST } from '../utils/constants';

interface actionBox {
  width: string;
  stake: string;
  entriesInCurrentGame: number;
  entriesInPreviousGame: number;
  provider: ethers.providers.Provider;
  gameAddress: string;
  openForBusiness: boolean;
  maxPlayers: number;
  queuePtr: number;
  accountAddress: string;
  currentBlockNumber: number;
  chain: string;
}

const EMPTY_EVENTS: Event[] = [];
const PAGE_SIZE = 1000;
const NUM_PAGES = 100;

const compareFunc = (e1: Event, e2: Event) => (
  e2.blockNumber - e1.blockNumber || e2.logIndex - e1.logIndex
);

export default function ActionBox(props: actionBox) {
  const {
    width,
    stake,
    entriesInCurrentGame,
    entriesInPreviousGame,
    provider,
    gameAddress,
    openForBusiness,
    maxPlayers,
    queuePtr,
    accountAddress,
    currentBlockNumber,
    chain,
  } = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [allEvents, setAllEvents] = useState(EMPTY_EVENTS);
  const [loading, setLoading] = useState(false);

  const filter = {
    address: gameAddress,
    topics: [
      EVENT_LIST,
      [hexZeroPad(accountAddress, 32)],
    ],
  };

  const getData = async (startingBlockNumber: number) => {
    setLoading(true);

    const groatGame = new ethers.Contract(
      gameAddress,
      groatABI.abi,
      provider,
    );

    /*
          Though this is hella inefficent, it reduces the chance
          of being rate-limited ...
        */

    for (let i = currentBlockNumber; i > startingBlockNumber; i -= PAGE_SIZE) {
      const events = await groatGame.queryFilter(
        filter,
        Math.max(
          i - PAGE_SIZE + 1,
          startingBlockNumber + 1,
        ),
        i,
      );
      events.forEach((e) => {
        if (e.removed === false) {
          setAllEvents((oldResults) => [...oldResults, e].sort(compareFunc));
        }
      });
    }

    // Sleep for one second.
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    setLoading(false);
  };

  const reload = useCallback(async () => {
    if (loading) return;

    if (allEvents.length === 0) {
      getData(currentBlockNumber - NUM_PAGES * PAGE_SIZE);
      return;
    }

    setLoading(true);

    const groatGame = new ethers.Contract(
      gameAddress,
      groatABI.abi,
      provider,
    );

    // Check last 100 blocks for reorg.
    const startingBlockNumber = allEvents[0].blockNumber - 100;
    let i = 0;
    while (i < allEvents.length && allEvents[i].blockNumber > startingBlockNumber) i++;

    const allEventsSlice = allEvents.slice(i, allEvents.length);

    for (i = startingBlockNumber + 1; i < currentBlockNumber; i += PAGE_SIZE) {
      const events = await groatGame.queryFilter(
        filter,
        i,
        Math.min(i + PAGE_SIZE, currentBlockNumber - 1),
      );

      events.forEach((e) => {
        if (e.removed === false) {
          allEventsSlice.push(e);
        }
      });
    }

    setAllEvents(allEventsSlice.sort(compareFunc));

    // Sleep for one second.
    await new Promise((res) => {
      setTimeout(res, 1000);
    });

    setLoading(false);
  }, [loading, currentBlockNumber]);

  useEffect(() => {
    if (accountAddress === '0x') return;

    getData(currentBlockNumber - NUM_PAGES * PAGE_SIZE);
  }, []);

  useEffect(() => {
    if (selectedTab === 1) {
      reload();
    }
  }, [selectedTab]);

  return (
    <div style={{
      width,
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <ActionBoxTabs
        selectedTab={selectedTab}
        changeSelectedTab={(tabNum: number) => setSelectedTab(tabNum)}
        showHistory={accountAddress !== '0x'}
      />
      {selectedTab === 0 && (
        <EnterLeaveBox
          width={width}
          entriesInCurrentGame={entriesInCurrentGame}
          entriesInPreviousGame={entriesInPreviousGame}
          stake={stake}
          openForBusiness={openForBusiness}
          gameAddress={gameAddress}
          provider={provider}
          maxPlayers={maxPlayers}
          queuePtr={queuePtr}
        />
      )}
      {selectedTab === 1 && (
        <HistoryBox
          numBlocks={PAGE_SIZE * NUM_PAGES}
          allEvents={allEvents}
          reload={reload}
          spinning={loading}
          currentBlockNumber={currentBlockNumber}
          chain={chain}
        />
      )}
    </div>
  );
}
