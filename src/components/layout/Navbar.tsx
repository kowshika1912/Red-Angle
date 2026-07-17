import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { StaggeredMenu } from './StaggeredMenu';
import PillNav from './PillNav';

import logoImg from '../../assets/red_angle_logo (1).png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/films', label: 'Films' },
  { to: '/packages', label: 'Packages' },
  { to: '/client-gallery', label: 'Clients' },
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

  const lightPages = ['/portfolio', '/services', '/blog', '/packages', '/client-gallery', '/films', '/gallery'];
  const isLightPage = lightPages.some(p => location.pathname.startsWith(p));
  const isDarkText = !scrolled && isLightPage;
  const textColor = isDarkText ? '#000000' : '#ffffff';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} alt="Red-Angle Studio" style={{ height: '40px', width: 'auto', filter: textColor === '#ffffff' ? 'invert(1)' : 'none' }} />
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
                { label: 'Instagram', link: 'https://www.instagram.com/redanglestudio?igsh=YjcwbXlsNnd0MWE3' },
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
