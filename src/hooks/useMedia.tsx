import { useState, useEffect } from 'react';

export default function useMedia(pixels: number): boolean {
  const [matches, setMatches] = useState(
    window.matchMedia(`(min-width: ${pixels}px)`).matches,
  );

  useEffect(() => {
    window.matchMedia(`(min-width: ${pixels}px)`).addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return matches;
}
