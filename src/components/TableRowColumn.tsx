import React from 'react';
import { BigNumber } from 'ethers';

interface tableRowColumn {
  value: BigNumber | number | string;
}

export default function TableRowColumn(props: tableRowColumn) {
  const {
    value,
  } = props;

  return (
    <td style={{
      textAlign: 'center',
    }}
    >
      {value.toString()}
    </td>
  );
}
