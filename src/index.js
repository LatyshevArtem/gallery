import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from './providers/theme-provider/ThemeProvider';
import App from './components/app/App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
