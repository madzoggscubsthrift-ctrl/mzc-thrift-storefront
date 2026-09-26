import React from 'react';
import ReactDOM from 'react-dom/client';
import NeverMissACubDropTest from './components/NeverMissACubDropTest';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <NeverMissACubDropTest />
    </React.StrictMode>
  );
}
