import React from 'react';
import GitHub from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        background: 'black',
        position: 'static',
      }}
      >
        <a
          href="https://github.com/tmisirpash/scapegroatv2"
        >
          <GitHub
            sx={{
              color: 'white',
            }}
          />
        </a>
      </div>
    </div>
  );
}
