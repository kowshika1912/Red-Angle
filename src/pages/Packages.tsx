import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Camera } from 'lucide-react';
import api from '../api/client';
import { Package } from '../types';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';
import img5 from '../assets/Manifesting Marriage Official_ Instagram, Facebook _ Linktree.jpg';
import img6 from '../assets/South Indian Bridal Look ✨️.jpg';
import img7 from '../assets/Tamil Wedding in London.jpg';

const packageCategories = ['All', 'WEDDING', 'MATERNITY', 'FASHION', 'CORPORATE', 'COMMERCIAL'];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1 },
  }),
};

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [enquiryPkg, setEnquiryPkg] = useState<Package | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    setLoading(true);
    const fallbackPackages: Package[] = [
      { id: '1', name: 'Premium Wedding', category: 'WEDDING', price: 150000, description: 'Complete coverage for your special day', image: img7, inclusions: ['2 Photographers', '1 Cinematographer', 'Pre-wedding shoot', 'Drone coverage'], isActive: true, isPopular: true, createdAt: '' },
      { id: '2', name: 'Pre-Wedding Magic', category: 'WEDDING', price: 50000, description: 'Romantic couple portraits', image: img5, inclusions: ['1 Photographer', '2 Locations', '1 Outfit change', 'Teaser video'], isActive: true, isPopular: false, createdAt: '' },
      { id: '3', name: 'Maternity Package', category: 'MATERNITY', price: 25000, description: 'Celebrate new beginnings', image: img3, inclusions: ['1 Photographer', 'Props included', '20 Edited photos'], isActive: true, isPopular: false, createdAt: '' },
      { id: '4', name: 'Kids Portrait', category: 'KIDS', price: 20000, description: 'Adorable moments captured', image: img1, inclusions: ['1 Photographer', 'Indoor/Outdoor setup', '15 Edited photos'], isActive: true, isPopular: false, createdAt: '' },
      { id: '5', name: 'Fashion Editorial', category: 'FASHION', price: 40000, description: 'High-end fashion photography', image: img6, inclusions: ['Studio setup', 'Lighting assistant', 'Retouching'], isActive: true, isPopular: false, createdAt: '' },
      { id: '6', name: 'Corporate Events', category: 'CORPORATE', price: 30000, description: 'Professional event coverage', image: img2, inclusions: ['1 Photographer', 'Full day coverage', 'Same day delivery'], isActive: true, isPopular: false, createdAt: '' }
    ];

    const url = activeCategory === 'All' ? '/packages' : `/packages?category=${activeCategory}`;
    api.get(url)
      .then(r => {
        if (r.data && r.data.length > 0) {
          setPackages(r.data);
        } else {
          setPackages(activeCategory === 'All' ? fallbackPackages : fallbackPackages.filter(p => p.category === activeCategory));
        }
      })
      .catch(() => {
        setPackages(activeCategory === 'All' ? fallbackPackages : fallbackPackages.filter(p => p.category === activeCategory));
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

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
    alert('Enquiry sent! We will contact you soon.');
  };

  const filtered = packages;

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Pricing</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Photography Packages</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: 'var(--space-md) auto 0', textAlign: 'center' }}>
              Transparent pricing with everything you need included
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {/* Category Filter */}
          <div className="filter-tabs">
            {packageCategories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? 'All' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
              {[1,2,3].map(i => (
                <div key={i} className="skeleton" style={{ height: 450, borderRadius: 'var(--radius-xl)' }} />
              ))}
            </div>
          ) : (
            <motion.div
              className="pricing-grid"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {filtered.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  className={`pricing-card ${pkg.isPopular ? 'popular' : ''}`}
                  variants={fadeUp}
                  custom={i}
                >
                  {pkg.isPopular && (
                    <div className="pricing-popular-badge">Most Popular</div>
                  )}
                  {pkg.image && (
                    <div style={{ 
                      width: 'calc(100% + var(--space-2xl) * 2)', 
                      height: '240px', 
                      margin: 'calc(-1 * var(--space-2xl)) calc(-1 * var(--space-2xl)) var(--space-xl) calc(-1 * var(--space-2xl))',
                      overflow: 'hidden', 
                      borderTopLeftRadius: 'var(--radius-xl)', 
                      borderTopRightRadius: 'var(--radius-xl)'
                    }}>
                      <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ paddingTop: pkg.isPopular && !pkg.image ? 'var(--space-md)' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                      <span className="badge badge-gold">{pkg.category.replace('_', ' ')}</span>
                    </div>
                    <div className="pricing-name">{pkg.name}</div>
                    <div className="pricing-description">{pkg.description}</div>
                    <div className="pricing-price">
                      <span className="pricing-currency">₹</span>
                      <span className="pricing-amount">{pkg.price.toLocaleString()}</span>
                    </div>
                    <ul className="pricing-inclusions">
                      {(pkg.inclusions as string[]).map((item, j) => (
                        <li key={j}>
                          <Check size={14} color="var(--gold-300)" strokeWidth={2.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline'}`}
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => setEnquiryPkg(pkg)}
                    >
                      Enquire Now <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Custom Package */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              marginTop: 'var(--space-3xl)',
              background: 'linear-gradient(135deg, var(--color-surface), rgba(212,165,87,0.05))',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>Need a Custom Package?</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto var(--space-xl)' }}>
              We create bespoke packages tailored to your specific needs and budget. Get in touch to discuss your vision.
            </p>
            <Link to="/contact" className="btn btn-primary">Get Custom Quote</Link>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Modal */}
      {enquiryPkg && (
        <div className="modal-overlay" onClick={() => setEnquiryPkg(null)}>
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>Enquire: {enquiryPkg.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  ₹{enquiryPkg.price.toLocaleString()}
                </p>
              </div>
              <button onClick={() => setEnquiryPkg(null)} style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>
            <form onSubmit={handleEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  required placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  className="form-input"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  required placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell us about your event date and requirements..."
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Packages;
