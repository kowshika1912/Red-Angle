import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { ReactLenis } from '@studio-freight/react-lenis';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import ProtectedRoute from './components/layout/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Packages from './pages/Packages';
import ClientGallery from './pages/ClientGallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAlbums from './pages/admin/AdminAlbums';
import AdminImages from './pages/admin/AdminImages';
import AdminBlog from './pages/admin/AdminBlog';
import AdminPackages from './pages/admin/AdminPackages';
import AdminMessages from './pages/admin/AdminMessages';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ReactLenis root>
      {/* Grain overlay */}
      <div className="noise-overlay" />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--color-border)',
          },
        }}
      />

      {/* Navbar (not on admin) */}
      {!isAdminPage && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/client-gallery" element={<ClientGallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/albums" element={<ProtectedRoute><AdminAlbums /></ProtectedRoute>} />
          <Route path="/admin/albums/:id/images" element={<ProtectedRoute><AdminImages /></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
          <Route path="/admin/packages" element={<ProtectedRoute><AdminPackages /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>

      {/* Footer (not on admin) */}
      {!isAdminPage && <Footer />}

      {/* WhatsApp float button */}
      {!isAdminPage && <WhatsAppFloat />}
    </ReactLenis>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
