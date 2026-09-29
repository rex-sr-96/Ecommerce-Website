import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Mens from './pages/Mens.jsx'
import Women from './pages/Women.jsx'
import Kids from './pages/Kids.jsx'
import Sale from './pages/Sale.jsx'
import Sports from './pages/Sports.jsx'
import Search from './pages/Search.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './components/Customer/Profile.jsx'
import Login from './components/Customer/Login.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import NotFound from './NotFound.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import FAQs from './components/CustomerCare/FAQ.jsx'
import ReturnsExchanges from './components/CustomerCare/ReturnExchange.jsx'
import ShippingPolicies from './components/CustomerCare/ShippingPolicy.jsx'
import ShoeSizeGuide from './components/CustomerCare/ShoeSizeGuide.jsx'
import TrackOrder from './components/CustomerCare/TrackOrder.jsx'
import Checkout from './components/CheckOut/CheckOut.jsx'
import PrivacyPolicy from './components/CompanyInfo/Privacy&Policy.jsx'
import TermsAndConditions from './components/CompanyInfo/Terms&Condition.jsx'
import About from './components/CompanyInfo/AboutCompany.jsx'
import CookieSettings from './components/CompanyInfo/Cookies.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/mens',
    element: <Mens />
  },
  {
    path: '/women',
    element: <Women />
  },
  {
    path: '/kids',
    element: <Kids />
  },
  {
    path: '/sports',
    element: <Sports />
  },
  {
    path: '/sale',
    element: <Sale />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/favorites',
    element: <Favorites />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/product/:id',
    element: <ProductDetails />
  },
  {
    path: '/products/:id',
    element: <ProductDetails />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/faq',
    element: <FAQs />
  },
  {
    path: '/return',
    element: <ReturnsExchanges />
  },
  {
    path: '/shipping',
    element: <ShippingPolicies />
  },
  {
    path: '/shoes',
    element: <ShoeSizeGuide />
  },
  {
    path: '/track',
    element: <TrackOrder />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/privacy&policy',
    element: <PrivacyPolicy />
  },
  {
    path: '/terms&conditon',
    element: <TermsAndConditions />
  },
  {
    path: '/cookies',
    element: <CookieSettings />
  },
  {
    path: '*',
    element: <NotFound />
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
