import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';
import App from './App.tsx';
import Navbar from './components/navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
