import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useHover from '../hooks/useHover';

interface rowExpandButton {
  updateModalOpen: () => void;
}

export default function RowExpandButton(props: rowExpandButton) {
  const {
    updateModalOpen,
  } = props;

  const [brightness, cursor, onMouseEnter, onMouseLeave] = useHover();

  return (
    <button
      type="button"
      style={{
        fontSize: '1.5rem',
        margin: '20px',
        borderRadius: '10px',
        color: 'white',
        background: 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%',
        filter: `brightness(${brightness})`,
        transitionDuration: '100ms',
        cursor: `${cursor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Electrolize',
        width: '200px',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        updateModalOpen();
      }}
    >
      {' '}
      Enter / Leave
      {' '}
      <ExpandMore sx={{ fontSize: '2rem' }} />
    </button>
  );
}
