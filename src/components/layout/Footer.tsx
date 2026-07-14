import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

// Social media SVG icons (not in lucide-react)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-logo">Red-Angle</div>
            <p className="footer-description">
              Capturing life's most precious moments with artistry and passion. 
              Professional photography and videography for every milestone.
            </p>
            <div className="social-links" style={{ marginTop: 'var(--space-xl)' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/portfolio?cat=WEDDING">Wedding Photography</Link></li>
              <li><Link to="/portfolio?cat=PRE_WEDDING">Pre-Wedding</Link></li>
              <li><Link to="/portfolio?cat=CANDID">Candid Photography</Link></li>
              <li><Link to="/portfolio?cat=MATERNITY">Maternity</Link></li>
              <li><Link to="/portfolio?cat=KIDS">Kids Photography</Link></li>
              <li><Link to="/portfolio?cat=FASHION">Fashion</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <li style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                <Phone size={14} color="var(--gold-300)" style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                <Mail size={14} color="var(--gold-300)" style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>hello@redanglestudio.com</span>
              </li>
              <li style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                <MapPin size={14} color="var(--gold-300)" style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>123 Studio Lane, Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Red-Angle Studio. All rights reserved.</p>
          <Link to="/admin/login" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
