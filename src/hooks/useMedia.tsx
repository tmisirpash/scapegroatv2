import { useState, useEffect } from 'react';

export default function useMedia(): boolean {
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches,
  );

  useEffect(() => {
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return matches;
}
