import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import api from '../../api/client';
import { Package } from '../../types';
import toast from 'react-hot-toast';

const CATEGORIES = ['WEDDING', 'PRE_WEDDING', 'MATERNITY', 'KIDS', 'FASHION', 'CORPORATE', 'COMMERCIAL'];

const emptyForm = {
  name: '',
  category: 'WEDDING',
  price: '',
  description: '',
  inclusions: '',
  isActive: true,
  isPopular: false,
};

const AdminPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/packages')
      .then(r => setPackages(r.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (pkg: Package) => {
    setEditing(pkg);
    setForm({
      name: pkg.name,
      category: pkg.category,
      price: String(pkg.price),
      description: pkg.description || '',
      inclusions: (pkg.inclusions as string[]).join('\n'),
      isActive: pkg.isActive,
      isPopular: pkg.isPopular,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        price: parseFloat(form.price),
        inclusions: form.inclusions.split('\n').map(s => s.trim()).filter(Boolean),
      };

      if (editing) {
        await api.put(`/packages/${editing.id}`, data);
        toast.success('Package updated');
      } else {
        await api.post('/packages', data);
        toast.success('Package created');
      }
      setShowModal(false);
      load();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await api.delete(`/packages/${id}`);
      toast.success('Package deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Packages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            Manage your photography packages and pricing
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate} style={{ padding: '0.7rem 1.5rem' }}>
          <Plus size={16} /> New Package
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 380, borderRadius: 'var(--radius-lg)' }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {packages.map(pkg => (
            <div key={pkg.id} className={`pricing-card ${pkg.isPopular ? 'popular' : ''}`}>
              {pkg.isPopular && <div className="pricing-popular-badge">Most Popular</div>}
              <div style={{ paddingTop: pkg.isPopular ? 'var(--space-md)' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                  <span className="badge badge-gold">{pkg.category.replace('_', ' ')}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost" style={{ padding: '0.3rem' }} onClick={() => openEdit(pkg)}>
                      <Pencil size={14} />
                    </button>
                    <button className="btn btn-ghost" style={{ padding: '0.3rem', color: '#f87171' }} onClick={() => handleDelete(pkg.id, pkg.name)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="pricing-name">{pkg.name}</div>
                <div className="pricing-description">{pkg.description}</div>
                <div className="pricing-price">
                  <span className="pricing-currency">₹</span>
                  <span className="pricing-amount">{pkg.price.toLocaleString()}</span>
                </div>
                <ul className="pricing-inclusions">
                  {(pkg.inclusions as string[]).map((item, i) => (
                    <li key={i}><Check size={12} color="var(--gold-300)" />{item}</li>
                  ))}
                </ul>
                {!pkg.isActive && (
                  <span className="badge badge-red">Inactive</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editing ? 'Edit Package' : 'New Package'}</h3>
                <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                  <div className="form-group">
                    <label className="form-label">Package Name *</label>
                    <input
                      className="form-input"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      required placeholder="e.g. Gold Package"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-input"
                      value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      style={{ background: 'var(--color-surface)' }}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    className="form-input"
                    type="number"
                    value={form.price}
                    onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                    required placeholder="45000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    className="form-input"
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Short description"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inclusions (one per line) *</label>
                  <textarea
                    className="form-input"
                    value={form.inclusions}
                    onChange={e => setForm(p => ({ ...p, inclusions: e.target.value }))}
                    required
                    placeholder="8 hours coverage&#10;500 edited photos&#10;Online gallery"
                    style={{ minHeight: 140 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-xl)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Active</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isPopular} onChange={e => setForm(p => ({ ...p, isPopular: e.target.checked }))} />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Mark as Popular</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminPackages;
