import React from 'react';
import { BigNumber } from 'ethers';
import { Tooltip } from '@mui/material';

interface tableRowColumn {
  value: BigNumber | number | string;
  tooltip?: string;
}

export default function TableRowColumn(props: tableRowColumn) {
  const {
    value,
    tooltip,
  } = props;

  return (
    <td style={{
      textAlign: 'center',
    }}
    >
      <Tooltip title={tooltip}>
        <span>{value.toString()}</span>
      </Tooltip>
    </td>
  );
}

TableRowColumn.defaultProps = {
  tooltip: '',
};
