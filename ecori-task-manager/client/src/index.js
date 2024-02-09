// Import modules
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Create a new React root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main React application inside a StrictMode wrapper
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

