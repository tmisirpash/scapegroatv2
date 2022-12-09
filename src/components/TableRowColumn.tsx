import React from 'react';
import { BigNumber } from 'ethers';
import { Tooltip } from '@mui/material';

interface tableRowColumn {
  className?: string;
  value: BigNumber | number | string;
  tooltip?: string;
}

export default function TableRowColumn(props: tableRowColumn) {
  const {
    value,
    tooltip,
    className,
  } = props;

  return (
    <td style={{
      textAlign: 'center',
    }}
    >
      <Tooltip title={tooltip}>
        <span className={className}>{value.toString()}</span>
      </Tooltip>
    </td>
  );
}

TableRowColumn.defaultProps = {
  className: '',
  tooltip: '',
};
