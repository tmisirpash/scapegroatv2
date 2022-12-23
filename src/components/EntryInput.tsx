import React, { ChangeEvent } from 'react';

interface entryInput {
  value: string;
  updateEntries: (newVal: string) => void;
  fontSize: string;
}

export default function EntryInput(props: entryInput) {
  const {
    value,
    updateEntries,
    fontSize,
  } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (/^[1-9]\d*$/.test(event.target.value) || event.target.value.length === 0) updateEntries(event.target.value);
  }

  return (
    <input
      type="text"
      value={value}
      maxLength={3}
      placeholder="1"
      onChange={handleChange}
      style={{
        width: 'min(24vw, 120px)',
        marginLeft: '10px',
        marginRight: '10px',
        background: 'transparent',
        borderStyle: 'solid',
        borderColor: 'cyan',
        color: 'cyan',
        textAlign: 'center',
        fontSize,
        fontFamily: 'Electrolize',
      }}
    />
  );
}
