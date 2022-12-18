import React, { useMemo } from 'react';

interface tableRowColumnNoTooltip {
  value: string;
  fontSize?: string;
}

export default function TableRowColumnNoTooltip(props: tableRowColumnNoTooltip) {
  const {
    value,
    fontSize,
  } = props;

  const chars : string[] = useMemo(() => {
    const charList: string[] = [];
    for (let i = 0; i < value.length; i++) {
      charList.push(value[i]);
    }
    return charList;
  }, [value]);

  return (
    <td style={{
      textAlign: 'center',
      fontSize,
      wordWrap: 'break-word',
    }}
    >
      {chars.map((c) => {
        if (c === ',') {
          return <span style={{ color: 'cyan', fontSize: '2rem' }}>{c}</span>;
        } if (c === '.') {
          return <span style={{ color: 'cyan', fontWeight: 'bold', fontSize: '2rem' }}>{c}</span>;
        }
        return <span>{c}</span>;
      })}
    </td>
  );
}

TableRowColumnNoTooltip.defaultProps = {
  fontSize: '2rem',
};
