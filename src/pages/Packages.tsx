import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, X } from 'lucide-react';
import api from '../api/client';
import { Package } from '../types';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';
import img5 from '../assets/Manifesting Marriage Official_ Instagram, Facebook _ Linktree.jpg';
import img6 from '../assets/South Indian Bridal Look ✨️.jpg';
import img7 from '../assets/Tamil Wedding in London.jpg';

const packageCategories = ['All', 'WEDDING', 'MATERNITY', 'FASHION', 'CORPORATE', 'COMMERCIAL'];

// Smooth, cinematic fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.21, 0.47, 0.32, 0.98] // Custom easing for a premium feel
    },
  }),
};

const fallbackPackages: Package[] = [
  { id: '1', name: 'Premium Wedding', category: 'WEDDING', price: 150000, description: 'Comprehensive storytelling coverage for your most special day.', image: img7, inclusions: ['2 Lead Photographers', '1 Cinematographer', 'Pre-wedding shoot', 'Drone coverage', 'Premium Album'], isActive: true, isPopular: true, createdAt: '' },
  { id: '2', name: 'Pre-Wedding Magic', category: 'WEDDING', price: 50000, description: 'Cinematic and romantic couple portraits in bespoke locations.', image: img5, inclusions: ['1 Lead Photographer', '2 Premium Locations', 'Unlimited Outfit changes', 'Cinematic Teaser'], isActive: true, isPopular: false, createdAt: '' },
  { id: '3', name: 'Maternity Portraits', category: 'MATERNITY', price: 25000, description: 'Elegant and timeless captures to celebrate your new beginnings.', image: img3, inclusions: ['1 Photographer', 'Curated Props & Styling', '20 Retouched portraits', 'Studio or Outdoor'], isActive: true, isPopular: false, createdAt: '' },
  { id: '4', name: 'Kids & Family', category: 'KIDS', price: 20000, description: 'Candid, joyful moments frozen in time for your family legacy.', image: img1, inclusions: ['1 Photographer', 'Indoor/Outdoor setup', '15 Retouched photos', 'Online Gallery'], isActive: true, isPopular: false, createdAt: '' },
  { id: '5', name: 'Fashion Editorial', category: 'FASHION', price: 40000, description: 'High-end, magazine-quality fashion and portfolio photography.', image: img6, inclusions: ['Studio setup', 'Lighting assistant', 'High-end Retouching', 'Concept consultation'], isActive: true, isPopular: false, createdAt: '' },
  { id: '6', name: 'Corporate Events', category: 'CORPORATE', price: 30000, description: 'Discreet, professional coverage for galas and corporate summits.', image: img2, inclusions: ['1 Photographer', 'Full day coverage', 'Same day delivery (Highlights)', 'Commercial usage rights'], isActive: true, isPopular: false, createdAt: '' }
];

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [enquiryPkg, setEnquiryPkg] = useState<Package | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryPkg) return;
    await api.post('/contact', {
      ...formData,
      service: enquiryPkg.name,
      message: `Package Enquiry: ${enquiryPkg.name} (₹${enquiryPkg.price.toLocaleString()})\n\n${formData.message}`,
    });
    setEnquiryPkg(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('Thank you for your enquiry. Our team will reach out to you shortly.');
  };

  const filtered = activeCategory === 'All' ? fallbackPackages : fallbackPackages.filter(p => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--text-main)', fontFamily: 'var(--font-body)' }}>

      {/* Hero Section */}
      <section style={{ padding: '6rem 1rem 3rem' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold-300)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>
              Investment
            </div>
            <h1 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)', fontSize: '3.5rem', fontWeight: '400', textAlign: 'center', lineHeight: 1.2 }}>
              Photography Packages
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 550, margin: '1.5rem auto 0', textAlign: 'center', lineHeight: '1.6', fontSize: '1.1rem' }}>
              Transparent pricing. Impeccable attention to detail. Everything you need to capture your legacy flawlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '2rem 1rem 6rem' }}>
        <div className="container">

          {/* Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {packageCategories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? 'The Collection' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>
            <motion.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  className={`pricing-card ${pkg.isPopular ? 'popular' : ''}`}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -8 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {pkg.isPopular && (
                    <div className="pricing-popular-badge">Signature</div>
                  )}

                  {pkg.image && (
                    <div style={{
                      width: 'calc(100% + 4rem)',
                      height: '280px',
                      margin: '-2rem -2rem 1.5rem -2rem',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {/* Gradient overlay to blend image seamlessly into the card */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--color-surface) 100%)', zIndex: 1 }} />
                      <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--gold-300)', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                        {pkg.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', marginBottom: '0.75rem', fontWeight: '400', letterSpacing: '0.5px' }}>
                      {pkg.name}
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', minHeight: '45px', lineHeight: 1.6 }}>
                      {pkg.description}
                    </p>

                    <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                      <span style={{ color: 'var(--gold-300)', fontSize: '1.25rem', marginTop: '0.25rem' }}>₹</span>
                      <span style={{ fontSize: '2.75rem', fontWeight: '300', color: 'var(--text-main)', lineHeight: 1 }}>
                        {pkg.price.toLocaleString()}
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {(pkg.inclusions as string[]).map((item, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.4 }}>
                          <Check size={18} color="var(--gold-300)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      style={{
                        marginTop: 'auto',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '1.1rem',
                        backgroundColor: pkg.isPopular ? 'var(--gold-300)' : 'transparent',
                        color: pkg.isPopular ? '#000' : 'var(--gold-300)',
                        border: `1px solid var(--gold-300)`,
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                      onClick={() => setEnquiryPkg(pkg)}
                      onMouseEnter={(e) => {
                        if (!pkg.isPopular) e.currentTarget.style.backgroundColor = 'rgba(212, 165, 87, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        if (!pkg.isPopular) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Reserve Date <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          {/* Custom Package Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '5rem',
              background: 'linear-gradient(135deg, var(--color-surface), rgba(212,165,87,0.08))',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>
              Bespoke Commissions
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Every story is unique. We create highly customized coverage plans tailored specifically to your vision, destination, and multi-day event requirements.
            </p>
            <Link to="/contact" style={{
              display: 'inline-flex',
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--text-main)',
              color: 'var(--color-bg)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}>
              Request Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Elegant Enquiry Modal */}
      <AnimatePresence>
        {enquiryPkg && (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(4, 10, 13, 0.85)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={() => setEnquiryPkg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setEnquiryPkg(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 400 }}>
                  Reserve {enquiryPkg.name}
                </h3>
                <p style={{ color: 'var(--gold-300)', fontSize: '1.1rem' }}>
                  ₹{enquiryPkg.price.toLocaleString()}
                </p>
              </div>

              <form onSubmit={handleEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                  <input
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                  <input
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone Number</label>
                  <input
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Event Details</label>
                  <textarea
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', minHeight: '120px', resize: 'vertical' }}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your event date, location, and vision..."
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '1.1rem',
                    backgroundColor: 'var(--gold-300)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Send Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Packages;