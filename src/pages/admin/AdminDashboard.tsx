import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Images, FileText, Package, MessageSquare, Camera } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import api from '../../api/client';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ albums: 0, images: 0, posts: 0, packages: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/albums/admin/all').catch(() => ({ data: [] })),
      api.get('/blog/admin/all').catch(() => ({ data: [] })),
      api.get('/packages').catch(() => ({ data: [] })),
      api.get('/contact').catch(() => ({ data: [] })),
    ]).then(([albums, posts, packages, messages]) => {
      setStats({
        albums: albums.data.length,
        images: albums.data.reduce((acc: number, a: any) => acc + (a._count?.images || 0), 0),
        posts: posts.data.length,
        packages: packages.data.length,
        messages: messages.data.length,
      });
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { icon: <Images size={24} />, label: 'Albums', value: stats.albums, color: '#d4a557' },
    { icon: <Camera size={24} />, label: 'Total Photos', value: stats.images, color: '#d4a557' },
    { icon: <FileText size={24} />, label: 'Blog Posts', value: stats.posts, color: '#d4a557' },
    { icon: <Package size={24} />, label: 'Packages', value: stats.packages, color: '#d4a557' },
    { icon: <MessageSquare size={24} />, label: 'Messages', value: stats.messages, color: '#d4a557' },
  ];

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            Welcome back to Red-Angle Studio admin
          </p>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)',
          padding: '0.5rem 1rem',
          background: 'rgba(212,165,87,0.1)',
          border: '1px solid rgba(212,165,87,0.3)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold-300)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
          System Online
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            className="admin-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="admin-stat-icon">{card.icon}</div>
            <div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {loading ? '...' : card.value}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {card.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)' }}>
          {[
            { label: 'Create Album', link: '/admin/albums', icon: <Images size={20} /> },
            { label: 'Write Blog Post', link: '/admin/blog', icon: <FileText size={20} /> },
            { label: 'Add Package', link: '/admin/packages', icon: <Package size={20} /> },
            { label: 'View Messages', link: '/admin/messages', icon: <MessageSquare size={20} /> },
          ].map((action, i) => (
            <motion.a
              key={i}
              href={action.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 'var(--space-sm)',
                padding: 'var(--space-xl)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              whileHover={{ borderColor: 'var(--gold-300)', y: -4 }}
            >
              <div style={{ color: 'var(--gold-300)' }}>{action.icon}</div>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{action.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-xl)',
          background: 'rgba(212,165,87,0.05)',
          border: '1px solid rgba(212,165,87,0.2)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-sm)', color: 'var(--gold-300)' }}>
          💡 Getting Started
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          <li>✦ Create albums and upload your photography work from the Albums section</li>
          <li>✦ Mark albums as "Client Gallery" to display them on the Client Gallery page</li>
          <li>✦ Write blog posts to engage your audience and improve SEO</li>
          <li>✦ Manage your photography packages with pricing from the Packages section</li>
        </ul>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
