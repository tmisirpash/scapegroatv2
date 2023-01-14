import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const rootNode = document.getElementById('app');
if (rootNode) {
  createRoot(rootNode).render(<App />);
}

// Really not happy about this hack, but it will
// do until the cause of the Chrome-on-Windows
// bug becomes clearer.
if (window.localStorage && !!window.chrome) {
  if (!localStorage.getItem('scapeGroatFirstLoad')) {
    localStorage.scapeGroatFirstLoad = true;
    window.location.reload();
  } else {
    localStorage.removeItem('scapeGroatFirstLoad');
  }
}
