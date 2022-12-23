import React, { useState } from 'react';
import { utils } from 'ethers';
import Info from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import EntryInput from './EntryInput';
import BlueButton from './BlueButton';
import YesNoPanel from './YesNoPanel';

interface actionBox {
  width: string;
  stake: string;
}
export default function ActionBox(props: actionBox) {
  const {
    width,
    stake,
  } = props;

  const [entriesAdd, setEntriesAdd] = useState('');
  const [, setExactEntriesAdd] = useState(false);
  const [entriesRemove, setEntriesRemove] = useState('');

  return (
    <div style={{
      width,
      float: 'right',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: 'silver',
        borderBottomStyle: 'solid',
        borderColor: 'dimgray',
        padding: 'none',
        minWidth: '200px',
      }}
      >
        <div />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '5px',
        }}
        >
          <button
            type="button"
            style={{
              fontFamily: 'Electrolize',
              background: '#404040',
              color: 'white',
              borderStyle: 'solid',
              borderColor: 'dimgray',
              borderBottom: 'none',
              textAlign: 'center',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Enter / Leave
          </button>
          <button
            type="button"
            style={{
              fontFamily: 'Electrolize',
              background: 'black',
              color: 'white',
              borderStyle: 'solid',
              borderColor: 'dimgray',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              borderBottom: 'none',
              cursor: 'pointer',
            }}
          >
            History
          </button>
        </div>
      </div>
      <div style={{
        fontSize: 'min(5vw, 2rem)',
        height: width === '100%' ? '75px' : '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        You have 2 entries in the current game.
      </div>
      <div style={{
        height: width === '100%' ? '300px' : '50%',
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
              ? Number(entriesAdd) : 1))}
            {' '}
            ETH
          </div>
        </div>
        <div style={{
          fontSize: 'min(6vw, 2rem)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <div>
            <div>
              {'Fulfill an exact order? '}
              <Tooltip
                title={(
                  <span style={{ fontSize: '1.2rem' }}>
                    {`If you indicate yes, the transaction to add
                        your entries will revert if, at validation time, 
                        there turn out to be fewer openings in the
                        current game than entries you requested (for instance
                        if you ask for the final 3 entries
                        and someone else asks for 2 entries at the same time, and their transaction happens 
                        to get included in a block first). If you indicate no, 
                        entries will be assigned to you on a best-effort basis up to the number of entries specified, and
                        you will be refunded any unused ETH.`}
                  </span>
                )}
              >
                <Info />
              </Tooltip>
            </div>
            <YesNoPanel
              setExactOrder={(val: boolean) => {
                setExactEntriesAdd(val);
              }}
            />
          </div>
        </div>
        <BlueButton
          value="Submit"
        />
      </div>

      <div style={{
        height: width === '100%' ? '100px' : '20%',
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
            {utils.commify(Number(utils.formatEther(stake)) * (entriesRemove.length > 0
              ? Number(entriesRemove) : 1))}
            {' '}
            ETH
          </div>
        </div>
        <BlueButton
          value="Submit"
        />
      </div>

    </div>
  );
}
