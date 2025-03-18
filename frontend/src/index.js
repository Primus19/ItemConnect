import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This will be created if it doesn't exist
import App from './App';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render with React.StrictMode for better development experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
