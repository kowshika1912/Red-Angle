import React from 'react';
import { Link } from 'react-router-dom';
import { Pin } from 'lucide-react'; // Fallback for pinterest

import logoImg from '../../assets/red_angle_logo (1).png';

const FacebookIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 7.1A2.5 2.5 0 0 1 5 4.6h14a2.5 2.5 0 0 1 2.5 2.5v9.8a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5V7.1z"></path><path d="m10 15 5-3-5-3v6z"></path>
  </svg>
);

const PinterestIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-4-6.5-4-10a4 4 0 1 1 8 0c0 3.5-4 10-4 10z"/><circle cx="12" cy="12" r="1.5"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--color-border-2)', background: 'var(--color-bg)', position: 'relative', margin: 0, padding: 0 }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="new-footer-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          {/* Left Column: Follow Us */}
          <div style={{ padding: '0 2rem' }}>
            <h4 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem', 
              letterSpacing: '0.15em', 
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              fontWeight: 400
            }}>
              FOLLOW US
            </h4>
            <a href="mailto:contact@redanglestudio.com" style={{ 
              display: 'block', 
              color: 'var(--text-secondary)', 
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              textDecoration: 'none',
              fontSize: '0.95rem'
            }}>
              hello@redanglestudio.com
            </a>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '80%', margin: '0 auto' }}>
              <a href="#" style={{ color: 'var(--text-secondary)' }}><FacebookIcon size={15} /></a>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border-2)' }} />
              <a href="https://www.instagram.com/redanglestudio?igsh=YjcwbXlsNnd0MWE3" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><InstagramIcon size={15} /></a>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border-2)' }} />
              <a href="#" style={{ color: 'var(--text-secondary)' }}><LinkedinIcon size={15} /></a>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border-2)' }} />
              <a href="#" style={{ color: 'var(--text-secondary)' }}><PinterestIcon size={15} /></a>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border-2)' }} />
              <a href="#" style={{ color: 'var(--text-secondary)' }}><YoutubeIcon size={15} /></a>
            </div>
          </div>

          {/* Middle Column: Emblem / Logo */}
          <div style={{ 
            borderLeft: '1px solid var(--color-border-2)', 
            borderRight: '1px solid var(--color-border-2)',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link to="/">
              <img src={logoImg} alt="Red-Angle Studio" style={{ maxHeight: '60px', width: 'auto' }} />
            </Link>
          </div>

          {/* Right Column: Reach Us */}
          <div style={{ padding: '0 2rem' }}>
            <h4 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem', 
              letterSpacing: '0.15em', 
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              fontWeight: 400
            }}>
              Reach Us
            </h4>
            <div style={{ 
              color: 'var(--text-secondary)', 
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              fontSize: '0.95rem'
            }}>
              +91 98765 43210 &nbsp;|&nbsp; +91 98765 43211
            </div>
            <Link to="/contact" style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem', 
              letterSpacing: '0.15em', 
              color: 'var(--text-secondary)',
              textDecoration: 'none'
            }}>
              FAQ's
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'var(--gold-100)',
        padding: '0.5rem var(--space-xl)',
        borderTop: '1px solid var(--color-border-2)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        fontStyle: 'italic',
        width: '100%'
      }}>
        <div>© Copyrights Red-Angle Studio. All Rights Reserved.</div>
        <div>Powered by iTech</div>
      </div>
    </footer>
  );
};

export default Footer;

