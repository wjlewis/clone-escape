import React from 'react';
import ReactDOM from 'react-dom/client';
import Prison from './Prison';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <article>
      <h1>Escape of the Clones</h1>
      <figure>
        <Prison side={12} />
        <figcaption>Can the clones escape?</figcaption>
      </figure>
    </article>
  </React.StrictMode>
);
