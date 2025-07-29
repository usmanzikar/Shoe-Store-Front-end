// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/CartStore.js';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx'; 
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider> {/* ✅ Wrap App with AuthProvider for instant navbar tab change to login to my profile vise versa*/}
        <BrowserRouter>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
