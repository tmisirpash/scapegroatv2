import React from 'react';
import TableHeader from './TableHeader';

export default function Table() {
  return (
    <div style={{
      overflow: 'auto',
    }}
    >
      <table>
        <TableHeader />
      </table>
    </div>
  );
}
