import React from 'react';
import useHover from '../hooks/useHover';

interface blueButton {
  value: string;
  width?: string;
  fontSize?: string;
}

export default function BlueButton(props: blueButton) {
  const {
    value,
    width,
    fontSize,
  } = props;

  const [brightness, cursor, onMouseEnter, onMouseLeave] = useHover();

  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        right: '0px',
        fontSize,
        width,
        borderRadius: '15px',
        color: 'white',
        background: 'linear-gradient(90deg, rgba(43,143,203,1) 29%, rgba(12,106,212,1) 100%',
        fontFamily: 'Electrolize',
        cursor,
        filter: `brightness(${brightness})`,
        transitionDuration: '100ms',
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
