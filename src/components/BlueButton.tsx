import React from 'react';
import useHover from '../hooks/useHover';

interface blueButton {
  value: string;
  width?: string;
  fontSize?: string;
  onClick: () => void;
  allowClick: boolean;
}

const activated = 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%';
const deactivated = 'dimgray';

export default function BlueButton(props: blueButton) {
  const {
    value,
    width,
    fontSize,
    onClick,
    allowClick,
  } = props;

  const [brightness, cursor, onMouseEnter, onMouseLeave] = useHover();

  return (
    <button
      type="button"
      onMouseEnter={allowClick ? onMouseEnter : () => undefined}
      onMouseLeave={allowClick ? onMouseLeave : () => undefined}
      onClick={allowClick ? onClick : () => undefined}
      style={{
        right: '0px',
        fontSize,
        width,
        borderRadius: '15px',
        color: 'white',
        background: allowClick ? activated : deactivated,
        fontFamily: 'Electrolize',
        cursor,
        filter: `brightness(${brightness})`,
        transitionDuration: '100ms',
        border: 'none',
      }}
    >
      {value}
    </button>
  );
}

BlueButton.defaultProps = {
  width: '100%',
  fontSize: '2rem',
};
