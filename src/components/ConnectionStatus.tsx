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
    <div
      className="unselectable"
      style={{
        color: 'white',
        textAlign: 'center',
      }}
    >
      {connectionStatusText}
    </div>
  );
}
