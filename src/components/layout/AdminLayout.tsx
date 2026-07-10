import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Images, FileText, Package, MessageSquare,
  LogOut, Camera, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', end: true },
  { to: '/admin/albums', icon: <Images size={18} />, label: 'Albums & Gallery' },
  { to: '/admin/blog', icon: <FileText size={18} />, label: 'Blog Posts' },
  { to: '/admin/packages', icon: <Package size={18} />, label: 'Packages' },
  { to: '/admin/messages', icon: <MessageSquare size={18} />, label: 'Messages' },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <Camera size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
          Red-Angle
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav-item" style={{ marginBottom: 'var(--space-xs)' }}>
            <ExternalLink size={18} />
            View Site
          </a>
          <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-sm)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Logged in as</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="admin-nav-item"
            style={{ width: '100%', color: '#f87171' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
