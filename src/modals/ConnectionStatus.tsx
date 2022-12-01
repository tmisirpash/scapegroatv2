import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';

interface connectionStatus {
  connectionStatusText: string;
}
export default function ConnectionStatus(props: connectionStatus) {
  const {
    connectionStatusText,
  } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(connectionStatusText.length !== 0);
  }, [connectionStatusText]);

  return (
    <div>
      <Modal open={open}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          color: 'white',
          fontSize: 'em',
          border: '2px solid white',
          textAlign: 'center',
          padding: '20px',
        }}
        >
          {connectionStatusText}
        </div>
      </Modal>
    </div>
  );
}
