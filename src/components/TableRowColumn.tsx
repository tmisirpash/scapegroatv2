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
      textAlign: 'center',
    }}
    >
      <Tooltip
        style={{
          fontSize,
          padding: '5px',
        }}
        title={<span style={{ fontSize: '1.2rem' }}>{tooltip}</span>}
      >
        <span className={className}>{value}</span>
      </Tooltip>
    </td>
  );
}

TableRowColumn.defaultProps = {
  className: '',
  tooltip: '',
  fontSize: '2rem',
};
