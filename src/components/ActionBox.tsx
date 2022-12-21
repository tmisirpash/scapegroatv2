import React from 'react';

interface actionBox {
  gameAddress: string;
  width: string;
}
export default function ActionBox(props: actionBox) {
  const {
    gameAddress,
    width,
  } = props;

  return (
    <div style={{
      width,
      float: 'right',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <span>{gameAddress}</span>
      <span>{gameAddress}</span>
      <span>{gameAddress}</span>
      <span>{gameAddress}</span>
      <span>{gameAddress}</span>

    </div>
  );
}
