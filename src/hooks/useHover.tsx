import { useState } from 'react';

export default function useHover(): [string, string, ()=>void, ()=>void] {
  const [brightness, setBrightness] = useState('1');
  const [cursor, setCursor] = useState('default');

  return [
    brightness,
    cursor,
    () => {
      setBrightness('1.2');
      setCursor('pointer');
    },
    () => {
      setBrightness('1');
      setCursor('default');
    },
  ];
}
