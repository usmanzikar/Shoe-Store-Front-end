// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/CartStore.js';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
       <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </Provider>
</StrictMode>

);
