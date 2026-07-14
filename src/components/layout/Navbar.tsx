import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { StaggeredMenu } from './StaggeredMenu';
import PillNav from './PillNav';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Book Us' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span>RED-ANGLE</span>
              <span>STUDIOS</span>
            </div>
          </Link>

          {/* Main Navigation Links (PillNav hover effect) */}
          <div className="desktop-only">
            <PillNav
              items={navLinks.map(l => ({ label: l.label, href: l.to }))}
              baseColor="#fff"
              pillColor="transparent"
              hoveredPillTextColor="#000"
              pillTextColor="#fff"
            />
          </div>

          {/* CTA / INFO */}
          <div className="navbar-info-group">
            <StaggeredMenu
              position="right"
              items={navLinks}
              socialItems={[
                { label: 'Facebook', link: '#' },
                { label: 'Instagram', link: '#' },
                { label: 'YouTube', link: '#' }
              ]}
              isFixed={true}
              menuButtonColor="#fff"
              openMenuButtonColor="#000"
              colors={['#B497CF', '#5227FF']}
              accentColor="var(--gold-300)"
              displayItemNumbering={true}
              displaySocials={true}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
