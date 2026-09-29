import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './WaslivoV2.jsx';
import './v2.css';
import './v2-pages.css';
import './v2-contact-mobile.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
