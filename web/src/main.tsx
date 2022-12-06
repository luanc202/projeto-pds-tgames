import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/main.css';
import { GameAds } from './pages/GameAds';
import { Home } from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import { AdminPanel } from './pages/AdminPanel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/game/:gameName',
    element: <GameAds />
  },
  {
    path: '/admin',
    element: <AdminPanel />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
)
