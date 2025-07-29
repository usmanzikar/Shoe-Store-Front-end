import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext'; // ✅ Make sure this is imported

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import BlogSection from './components/blogSection/BlogSectiom';
import FaqSection from './components/faqSection/FaqSection';
import LatestNewsSection from './components/latestNewsSection/LatestNews';
import OffersSection from './components/offerSection/Offersection';
import OrderPolicySection from './components/orderPolicy/OrderPolicy';
import Footer from './components/footer/Footer';
import ArrowUp from './components/common/ArrowUp';
import Men from './pages/Men';
import Women from './pages/Women';
import CategorySection from './components/categorySection/CategorySection';
import Performance from './pages/Performance';
import Casual from './pages/Casual';
import SearchResultSection from './components/searchResultSection/SearchResultSection';
import ProductDetail from './pages/ProductDetail';
import AllProductsCollection from './pages/AllProductsCollection';
import CategoryPage from './components/categorySection/CategoryPage';
import OfferPage from './pages/OfferPage';
import CartPage from './pages/CartPage';
import Signup from './components/authModel/SignUp';
import Login from './components/authModel/Login';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';

// ✅ Private Route Component
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll behavior when user comes from navbar buttons with scrollTo state
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 1000,
        offset: -80,
      });
      navigate('.', { replace: true, state: null });
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Element name="category">
                <CategorySection />
              </Element>
              <Products />
              <Element name="blog">
                <BlogSection />
              </Element>
              <Element name="faq">
                <FaqSection />
              </Element>
              <Element name="latest-news">
                <LatestNewsSection />
              </Element>
              <Element name="offer">
                <OffersSection />
              </Element>
              <Element name="about">
                <OrderPolicySection />
              </Element>
              <Element name="contact">
                <Footer />
              </Element>
              <ArrowUp />
            </>
          }
        />
        
        {/* Category Pages */}
        <Route path="/menswear" element={<Men />} />
        <Route path="/womenwear" element={<Women />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/casual" element={<Casual />} />
        <Route path="/:query" element={<SearchResultSection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collection" element={<AllProductsCollection />} />
        <Route path="/category/:categorypage" element={<CategoryPage />} />
        <Route path="/offerpage/:offerType" element={<OfferPage />} />

        {/* 🔒 Private Routes */}
        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
