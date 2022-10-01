import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/index.css';

if (process.env.NODE_ENV === 'development') {
    document.title = 'dev buguetter';
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
