import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lightPages = ['/portfolio', '/services', '/blog', '/packages', '/client-gallery'];
  const isLightPage = lightPages.some(p => location.pathname.startsWith(p));
  const isDarkText = !scrolled && isLightPage;
  const textColor = isDarkText ? '#000000' : '#ffffff';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: textColor }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span>RED-ANGLE</span>
              <span>STUDIOS</span>
            </div>
          </Link>

          {/* Main Navigation Links (PillNav hover effect) */}
          <div className="desktop-only">
            <PillNav
              items={navLinks.map(l => ({ label: l.label, href: l.to }))}
              baseColor={textColor}
              pillColor="transparent"
              hoveredPillTextColor={isDarkText ? "#ffffff" : "#000000"}
              pillTextColor={textColor}
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
              menuButtonColor={textColor}
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
