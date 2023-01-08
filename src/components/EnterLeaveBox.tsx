import React, { useState } from 'react';
import { ethers, utils, BigNumber } from 'ethers';
import { Tooltip } from '@mui/material';
import Info from '@mui/icons-material/Info';
import EntryInput from './EntryInput';
import YesNoPanel from './YesNoPanel';
import BlueButton from './BlueButton';
import groatABI from '../../dist/Groat.json';

interface enterLeaveBox {
  width: string;
  entriesInCurrentGame: number;
  entriesInPreviousGame: number;
  stake: string;
  openForBusiness: boolean;
  gameAddress: string;
  provider: ethers.providers.Provider;
  maxPlayers: number;
  queuePtr: number;
}

export default function EnterLeaveBox(props: enterLeaveBox) {
  const {
    width,
    entriesInCurrentGame,
    entriesInPreviousGame,
    stake,
    openForBusiness,
    gameAddress,
    provider,
    maxPlayers,
    queuePtr,
  } = props;

  const [entriesAdd, setEntriesAdd] = useState('');
  const [partialFulfill, setPartialFulfill] = useState(false);
  const [entriesRemove, setEntriesRemove] = useState('');

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
    >
      <div style={{
        fontSize: 'min(5vw, 1.2rem)',
        height: width === '100%' ? '150px' : '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: width === '100%' ? '20px' : '20%',
      }}
      >
        <div>
          You have
          {' '}
          <span style={{ color: 'cyan' }}>{entriesInCurrentGame}</span>
          {
            (entriesInCurrentGame === 1 ? ' entry' : ' entries')
          }
          {' '}
          in the current round.
        </div>
        <div>
          You have
          {' '}
          <span style={{ color: 'cyan' }}>{entriesInPreviousGame}</span>
          {
            (entriesInPreviousGame === 1 ? ' entry' : ' entries')
          }
          {' '}
          in the previous round that
          {
            (entriesInPreviousGame === 1 ? ' has' : ' have')
          }
          {' '}
          yet to take effect.
        </div>
      </div>
      <div style={{
        height: width === '100%' ? '300px' : '40%',
        padding: '15px',
        borderStyle: 'solid',
        borderColor: 'dimgray',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: '200px',
        minHeight: '200px',
      }}
      >
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'min(6vw, 2.5rem)',
          }}
          >
            Add
            <EntryInput
              value={entriesAdd}
              updateEntries={(newVal: string) => setEntriesAdd(newVal)}
              fontSize="min(6vw, 2.5rem)"
            />
            entries
          </div>
          <br />
          <div style={{
            color: 'silver',
          }}
          >
            Price:
            {' '}
            {utils.commify(Number(utils.formatEther(stake)) * (entriesAdd.length > 0
              ? Number(entriesAdd) : 0))}
            {' '}
            ETH
          </div>
        </div>
        <div style={{
          fontSize: 'min(5vw, 2rem)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <div>
            <div>
              {'Allow partial fulfillment? '}
              <Tooltip
                title={(
                  <span style={{ fontSize: '1.2rem' }}>
                    {
                      `Since there is always the possibility that someone
                        else sent a transaction to add entries at the same
                        time as you, there is no guarantee that there will
                        be enough openings for the number of entries you request. 
                        If you indicate 'Yes',
                        entries will be assigned to you on a best-effort basis up to
                        the number of entries specified, and you will be
                        refunded any unused ETH. If you indicate 'No', your transaction
                        will revert if an exact order cannot be met.`
                    }
                  </span>
                )}
              >
                <Info />
              </Tooltip>
            </div>
            <YesNoPanel
              setExactOrder={(val: boolean) => {
                setPartialFulfill(val);
              }}
            />
          </div>
        </div>
        <BlueButton
          value={openForBusiness ? 'Submit' : 'On Cooldown'}
          onClick={async () => {
            if (entriesAdd.length === 0) return;

            if (provider instanceof ethers.providers.Web3Provider) {
              const signer = provider.getSigner();
              const groatGame = new ethers.Contract(
                gameAddress,
                groatABI.abi,
                provider,
              );
              const groatGameWithSigner = groatGame.connect(signer);
              await groatGameWithSigner.depositEth(partialFulfill, {
                value: BigNumber.from(stake).mul(entriesAdd),
                gasLimit: 60000 + 15000 * Number(entriesAdd),
              });
              setEntriesAdd('');
            }
          }}
          allowClick={entriesAdd !== '' && openForBusiness && (partialFulfill || Number(entriesAdd) <= maxPlayers - queuePtr)}
        />
      </div>

      <div style={{
        height: width === '100%' ? '100px' : '22%',
        padding: '15px',
        borderStyle: 'solid',
        borderColor: 'dimgray',
        borderRadius: '15px',
        minWidth: '150px',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'min(5vw, 2.5rem)',
          }}
          >
            Remove
            <EntryInput
              value={entriesRemove}
              updateEntries={(newVal: string) => setEntriesRemove(newVal)}
              fontSize="min(5vw, 2.5rem)"
            />
            entries
          </div>
          <br />
          <div style={{
            color: 'silver',
          }}
          >
            Refund:
            {' '}
            {utils.commify(Number(utils.formatEther(stake)) * (
              entriesRemove.length > 0 && Number(entriesRemove) <= entriesInCurrentGame
                ? Number(entriesRemove) : 0))}
            {' '}
            ETH
          </div>
        </div>
        <BlueButton
          value={openForBusiness ? 'Submit' : 'On Cooldown'}
          allowClick={
            entriesRemove !== ''
                && entriesInCurrentGame > 0
                && Number(entriesRemove) <= entriesInCurrentGame
                && openForBusiness
          }
          onClick={async () => {
            if (provider instanceof ethers.providers.Web3Provider) {
              const signer = provider.getSigner();
              const groatGame = new ethers.Contract(
                gameAddress,
                groatABI.abi,
                provider,
              );
              const groatGameWithSigner = groatGame.connect(signer);
              await groatGameWithSigner.removeEntries(Number(entriesRemove));
              setEntriesRemove('');
            }
          }}
        />
      </div>
    </div>
  );
}
