import React from 'react';
import Table from './Table';

export default function PaginatedTable() {
  return (
    <div
      className="paddingBetweenCols"
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Table />
    </div>
  );
}
