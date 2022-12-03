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
    <th>
      <Tooltip title={tooltip}>
        <span style={{
          color: 'white',
        }}
        >
          {columnName}
        </span>
      </Tooltip>
    </th>
  );
}
