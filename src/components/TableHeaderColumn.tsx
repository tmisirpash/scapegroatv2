import React from 'react';
import { Tooltip } from '@mui/material';

export interface tableHeaderColumn {
  columnName: string;
  tooltip: string;
}

export function TableHeaderColumn(props: tableHeaderColumn) {
  const {
    columnName,
    tooltip,
  } = props;

  return (
    <th style={{
      textAlign: 'left',
      paddingLeft: '20px',
    }}
    >
      <Tooltip title={<span style={{ fontSize: '1.2rem' }}>{tooltip}</span>}>
        <span style={{
          color: 'lightgray',
          fontSize: '2rem',
        }}
        >
          {columnName}
        </span>
      </Tooltip>
    </th>
  );
}
