import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminLogin from './pages/Admin/AdminLogin.jsx'
import AdminProtectedRoute from './components/Admin/AdminProtectedRoute.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import ProductsManager from './pages/Admin/ProductsManager.jsx'
import OrdersManager from './pages/Admin/OrdersManager.jsx'
import UsersManager from './pages/Admin/UsersManager.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AdminLogin />
  },
  {
    path: '/',
    element: <AdminProtectedRoute />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { path: '', element: <Dashboard /> },
          { path: 'products', element: <ProductsManager /> },
          { path: 'orders', element: <OrdersManager /> },
          { path: 'users', element: <UsersManager /> },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  </StrictMode>,
)
