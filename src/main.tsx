import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { BagProvider } from './context/BagContext';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <BagProvider>
        <App />
      </BagProvider>
    </HashRouter>
  </StrictMode>,
);
