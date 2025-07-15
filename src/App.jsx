import { Routes, Route } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


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

function App() {

  const location = useLocation();
  const navigate = useNavigate();

useEffect(() => {
  if (location.pathname === "/" && location.state?.scrollTo) {
    scroller.scrollTo(location.state.scrollTo, {
      smooth: true,
      duration: 1000,
      offset: -80, // adjust for your fixed navbar
    });

    // Clear the scrollTo state so it doesn’t trigger again on reload
    navigate(".", { replace: true, state: null });
  }
}, [location]);
  

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
        <CategorySection/>
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
        <Route path="/menswear" element={<Men />} />
        <Route path="/womenwear" element={<Women />} />
        <Route path='/performance' element={<Performance/>}/>
        <Route path='/casual' element={<Casual/>}/>
        <Route path="/:query" element={<SearchResultSection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collection" element={<AllProductsCollection />} />
        <Route path="/category/:categorypage" element={<CategoryPage />} />
        <Route path="/offerpage/:offerType" element={<OfferPage />} />

      </Routes>
    </>
  );
}

export default App;
