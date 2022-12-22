import React, { useState } from 'react';
import { BigNumber, utils } from 'ethers';
import Info from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import EntryInput from './EntryInput';
import BlueButton from './BlueButton';
import YesNoPanel from './YesNoPanel';

interface actionBox {
  gameAddress: string;
  width: string;
  groatIndex: number;
  groatAddress: string;
  stake: BigNumber;
}
export default function ActionBox(props: actionBox) {
  const {
    gameAddress,
    width,
    groatIndex,
    groatAddress,
    stake,
  } = props;

  const [entriesAdd, setEntriesAdd] = useState('');
  const [, setExactEntriesAdd] = useState(false);

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
        textAlign: 'left',
        color: 'silver',
      }}
      >
        {' '}
        Game address:
        {' '}
        {gameAddress}
      </div>
      <div style={{
        padding: '15px',
      }}
      >
        <span style={{ fontSize: 'rem' }}>
          <span style={{ color: 'green' }}>{groatAddress}</span>
          {' '}
          got groated at position
          {' '}
          {groatIndex + 1}
          !
        </span>
      </div>
      <div style={{
        height: width === '100%' ? '500px' : '50%',
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
            fontSize: 'min(8vw, 3rem)',
          }}
          >
            Add
            <EntryInput
              value={entriesAdd}
              updateEntries={(newVal: string) => setEntriesAdd(newVal)}
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
                        your entries will revert if there are fewer openings in the
                        current game than entries you requested. If you indicate no, 
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
        height: '50%',
        padding: '15px',
        borderStyle: 'solid',
        borderColor: 'dimgray',
        borderRadius: '15px',
        minWidth: '200px',
      }}
      >
        <div style={{
          textAlign: 'left',
          fontSize: '2rem',
        }}
        />

      </div>

    </div>
  );
}
