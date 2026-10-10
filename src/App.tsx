import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { Toast } from './components/Toast';
import { SearchOverlay } from './components/SearchOverlay';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Collection } from './pages/Collection';
import { ProductPage } from './pages/ProductPage';
import { Shades } from './pages/Shades';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Bag } from './pages/Bag';
import { NotFound } from './pages/NotFound';
import { Faq, Delivery, Returns, Privacy, Terms } from './pages/Info';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header onSearch={() => setSearchOpen(true)} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections/:id" element={<Collection />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/shades" element={<Shades />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BagDrawer />
      <Toast />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
