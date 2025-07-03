import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';

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

function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Products />
              <BlogSection />
              <FaqSection />
              <LatestNewsSection />
              <OffersSection />
              <OrderPolicySection />
              <Footer />
              <ArrowUp />
            </>
          }
        />
        <Route path="/menswear" element={<Men />} />
        <Route path="/womenwear" element={<Women />} />
      </Routes>
    </>
  );
}

export default App;
