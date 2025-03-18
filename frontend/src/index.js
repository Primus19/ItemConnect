<<<<<<< HEAD
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
=======
import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
);
