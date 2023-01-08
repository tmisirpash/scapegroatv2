import React from 'react';
import { Tooltip } from '@mui/material';

interface tableRowColumn {
  className?: string;
  value: string;
  tooltip?: string;
  fontSize?: string;
}

export default function TableRowColumn(props: tableRowColumn) {
  const {
    value,
    tooltip,
    className,
    fontSize,
  } = props;

  return (
    <td style={{
      paddingLeft: '20px',
      paddingRight: '20px',
    }}
    >
      <Tooltip
        style={{
          fontSize,
        }}
        title={<span style={{ fontSize: '1.2rem' }}>{tooltip}</span>}
      >
        <button
          className={className}
          type="button"
          style={{
            fontFamily: 'Electrolize',
            fontSize: '2rem',
            background: 'transparent',
            color: 'white',
            border: 'none',
          }}
        >
          {value}
        </button>
      </Tooltip>
    </td>
  );
}

TableRowColumn.defaultProps = {
  className: '',
  tooltip: '',
  fontSize: '2rem',
};
