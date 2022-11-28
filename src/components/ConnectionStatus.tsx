import React from 'react';

interface connectionStatus {
  connectionStatusText: string;
}
export default function ConnectionStatus(
  props: connectionStatus,
) {
  const {
    connectionStatusText,
  } = props;
  return (
    <span
      className="unselectable"
      style={{
        color: 'white',
      }}
    >
      {connectionStatusText}
    </span>
  );
}
