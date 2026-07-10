import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Images, X, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import api, { getImageUrl } from '../../api/client';
import { Album, AlbumCategory } from '../../types';
import toast from 'react-hot-toast';

const CATEGORIES: AlbumCategory[] = ['WEDDING', 'PRE_WEDDING', 'CANDID', 'MATERNITY', 'KIDS', 'FASHION', 'CORPORATE', 'COMMERCIAL'];

const emptyForm = {
  title: '',
  category: 'WEDDING' as AlbumCategory,
  description: '',
  isPublic: true,
  isClientGallery: false,
  clientName: '',
};

const AdminAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Album | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/albums/admin/all')
      .then(r => setAlbums(r.data))
      .catch(() => toast.error('Failed to load albums'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (album: Album) => {
    setEditing(album);
    setForm({
      title: album.title,
      category: album.category,
      description: album.description || '',
      isPublic: album.isPublic,
      isClientGallery: album.isClientGallery,
      clientName: album.clientName || '',
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/albums/${editing.id}`, form);
        toast.success('Album updated');
      } else {
        await api.post('/albums', form);
        toast.success('Album created');
      }
      setShowModal(false);
      load();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This will also delete all images in this album.`)) return;
    try {
      await api.delete(`/albums/${id}`);
      toast.success('Album deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Albums & Gallery</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            Manage your photography albums
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate} style={{ padding: '0.7rem 1.5rem' }}>
          <Plus size={16} /> New Album
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 300, borderRadius: 'var(--radius-lg)' }} />)}
        </div>
      ) : albums.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
          <Camera size={60} color="var(--text-muted)" />
          <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-md)' }}>No albums yet. Create your first album!</p>
          <button className="btn btn-outline" style={{ marginTop: 'var(--space-lg)' }} onClick={openCreate}>
            <Plus size={16} /> Create Album
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
          {albums.map(album => (
            <motion.div
              key={album.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="card-image" style={{ aspectRatio: '3/2' }}>
                {album.coverImage ? (
                  <img src={getImageUrl(album.coverImage)} alt={album.title} />
                ) : (
                  <div className="img-placeholder" style={{ width: '100%', height: '100%' }}>
                    <Camera size={32} color="rgba(212,165,87,0.15)" />
                  </div>
                )}
                {/* Badges */}
                <div style={{ position: 'absolute', top: 'var(--space-sm)', left: 'var(--space-sm)', display: 'flex', gap: 4 }}>
                  <span className="badge badge-gold">{album.category.replace('_', ' ')}</span>
                  {!album.isPublic && <span className="badge badge-red">Private</span>}
                  {album.isClientGallery && <span className="badge badge-green">Client</span>}
                </div>
              </div>
              <div className="card-content">
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-xs)' }}>{album.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                  {album._count?.images || 0} photos
                  {album.clientName && ` • ${album.clientName}`}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                  <Link
                    to={`/admin/albums/${album.id}/images`}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '0.5rem', fontSize: 'var(--text-xs)' }}
                  >
                    <Images size={14} /> Manage Images
                  </Link>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: '0.5rem' }}
                    onClick={() => openEdit(album)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: '0.5rem', color: '#f87171' }}
                    onClick={() => handleDelete(album.id, album.title)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
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
                <h3>{editing ? 'Edit Album' : 'Create New Album'}</h3>
                <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div className="form-group">
                  <label className="form-label">Album Title *</label>
                  <input
                    className="form-input"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    required placeholder="e.g. Royal Wedding - Sharma Family"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-input"
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value as AlbumCategory }))}
                    style={{ background: 'var(--color-surface)' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Brief description of this album..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Client Name (optional)</label>
                  <input
                    className="form-input"
                    value={form.clientName}
                    onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))}
                    placeholder="e.g. Sharma Family"
                  />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-xl)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.isPublic}
                      onChange={e => setForm(p => ({ ...p, isPublic: e.target.checked }))}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Public album</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.isClientGallery}
                      onChange={e => setForm(p => ({ ...p, isClientGallery: e.target.checked }))}
                    />
                    <span style={{ fontSize: 'var(--text-sm)' }}>Show in Client Gallery</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : editing ? 'Update Album' : 'Create Album'}
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

export default AdminAlbums;
