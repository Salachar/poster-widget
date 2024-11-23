import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx'

window.POSTER_SIZE = 800;
window.POSTER_SCALE = 1.5;
window.POSTER_WIDTH = window.POSTER_SIZE;
window.POSTER_HEIGHT = window.POSTER_SIZE * window.POSTER_SCALE;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
