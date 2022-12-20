import React, { useMemo } from 'react';

interface tableRowColumnNoTooltip {
  value: string;
  fontSize?: string;
  className?: string;
  decimal?: boolean;
}

export default function TableRowColumnNoTooltip(props: tableRowColumnNoTooltip) {
  const {
    value,
    fontSize,
    className,
    decimal,
  } = props;

  const chars : string[] = useMemo(() => {
    const charList: string[] = [];
    for (let i = 0; i < value.length; i++) {
      charList.push(value[i]);
    }
    return charList;
  }, [value]);

  const slash: number = useMemo(() => value.indexOf('/'), [value]);

  return (
    <td style={{
      fontSize,
      wordWrap: 'break-word',
      paddingLeft: '20px',
    }}
    >
      {decimal && chars.map((c) => {
        if (c === ',') {
          return <span style={{ color: 'cyan', fontSize: '2rem' }}>{c}</span>;
        } if (c === '.') {
          return <span style={{ color: 'cyan', fontWeight: 'bold' }}>{c}</span>;
        }
        return <span>{c}</span>;
      })}
      {(!decimal)
        && (
          <div>
            {className === 'blinkingText'
              ? (
                <span style={{ color: 'cyan' }}>
                  {' '}
                  {value.slice(0, slash)}
                </span>
              )
              : <span style={{ color: 'cyan' }} className="blinkingText">{value.slice(0, slash)}</span>}
            <span>
              {' '}
              /
              {value.slice(slash + 1, value.length)}
            </span>
          </div>
        )}
    </td>
  );
}

TableRowColumnNoTooltip.defaultProps = {
  fontSize: '2rem',
  className: '',
  decimal: false,
};
