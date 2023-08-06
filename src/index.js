import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RocketsProvider } from './context/rockets';
import { AuthProvider } from './context/auth';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <BrowserRouter>
        <AuthProvider>
            <RocketsProvider>
                <App />
                <ToastContainer />
        </RocketsProvider>
        </AuthProvider>
    </BrowserRouter>
);
