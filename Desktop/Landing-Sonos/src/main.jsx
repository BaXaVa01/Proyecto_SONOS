import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './Landing.jsx';
import './Colores.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(<Landing />);
