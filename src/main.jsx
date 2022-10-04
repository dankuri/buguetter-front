import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/index.css';
import { BrowserRouter} from "react-router-dom"

if (process.env.NODE_ENV === 'development') {
    document.title = 'dev buguetter';
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
