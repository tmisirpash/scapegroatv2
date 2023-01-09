import React from 'react';
import { Tooltip } from '@mui/material';

export interface tableHeaderColumn {
  columnName: string;
  tooltip: string;
}

interface tableHeaderColumnComponent extends tableHeaderColumn {
  fontSize: string;
}

export function TableHeaderColumn(props: tableHeaderColumnComponent) {
  const {
    columnName,
    tooltip,
    fontSize,
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
          fontSize,
        }}
        >
          {columnName}
        </span>
      </Tooltip>
    </th>
  );
}
