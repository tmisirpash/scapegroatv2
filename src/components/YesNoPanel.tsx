import React, { useState } from 'react';

const activated = 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%';
const deactivated = 'dimgray';

interface yesNoPanel {
  setExactOrder: (val: boolean) => void;
}

export default function YesNoPanel(props: yesNoPanel) {
  const {
    setExactOrder,
  } = props;

  const [yesBackground, setYesBackground] = useState(deactivated);
  const [noBackground, setNoBackground] = useState(activated);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '5px',
    }}
    >
      <button
        type="button"
        onClick={() => {
          if (yesBackground === deactivated) {
            setYesBackground(activated);
            setNoBackground(deactivated);
            setExactOrder(true);
          }
        }}
        style={{
          fontSize: 'min(4vw, 1.2rem)',
          width: '100px',
          background: yesBackground,
          borderRadius: '15px',
          color: 'white',
          fontFamily: 'Electrolize',
          cursor: 'pointer',
        }}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => {
          if (noBackground === deactivated) {
            setNoBackground(activated);
            setYesBackground(deactivated);
            setExactOrder(false);
          }
        }}
        style={{
          fontSize: 'min(4vw, 1.2rem)',
          width: '100px',
          background: noBackground,
          borderRadius: '15px',
          color: 'white',
          fontFamily: 'Electrolize',
          cursor: 'pointer',
        }}
      >
        No
      </button>

    </div>
  );
}
