import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Add FontAwesome 
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// Add Inter font
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
document.head.appendChild(fontLink);

// Add title
const title = document.createElement('title');
title.textContent = 'Refabry - E-commerce Store';
document.head.appendChild(title);

createRoot(document.getElementById('root')!).render(<App />);
