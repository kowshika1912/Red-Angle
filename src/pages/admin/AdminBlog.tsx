import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import api, { getImageUrl } from '../../api/client';
import { BlogPost } from '../../types';
import toast from 'react-hot-toast';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: '',
  isPublished: false,
  coverImage: null as File | null,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/blog/admin/all')
      .then(r => setPosts(r.data))
      .catch(() => toast.error('Failed to load posts'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      tags: (post.tags as string[]).join(', '),
      isPublished: post.isPublished,
      coverImage: null,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('slug', form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
      fd.append('excerpt', form.excerpt);
      fd.append('content', form.content);
      fd.append('tags', JSON.stringify(form.tags.split(',').map(t => t.trim()).filter(Boolean)));
      fd.append('isPublished', String(form.isPublished));
      if (form.coverImage) fd.append('coverImage', form.coverImage);

      if (editing) {
        await api.put(`/blog/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Post updated');
      } else {
        await api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Post created');
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
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await api.delete(`/blog/${id}`);
      toast.success('Post deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Blog Posts</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            Manage your photography blog content
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate} style={{ padding: '0.7rem 1.5rem' }}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>No posts yet</td></tr>
            ) : posts.map(post => (
              <tr key={post.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    {post.coverImage && (
                      <img
                        src={getImageUrl(post.coverImage)}
                        alt={post.title}
                        style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>{post.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>/blog/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${post.isPublished ? 'badge-green' : 'badge-red'}`}>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(post.tags as string[]).slice(0, 2).map((tag, i) => (
                      <span key={i} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                </td>
                <td>{formatDate(post.publishedAt)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem' }} onClick={() => openEdit(post)}>
                      <Pencil size={14} />
                    </button>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem', color: '#f87171' }} onClick={() => handleDelete(post.id, post.title)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ maxWidth: 700, maxHeight: '90vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editing ? 'Edit Post' : 'New Blog Post'}</h3>
                <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input
                    className="form-input"
                    value={form.title}
                    onChange={e => {
                      const title = e.target.value;
                      setForm(p => ({
                        ...p,
                        title,
                        slug: p.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                      }));
                    }}
                    required placeholder="Post title"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input
                    className="form-input"
                    value={form.slug}
                    onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Excerpt</label>
                  <textarea
                    className="form-input"
                    value={form.excerpt}
                    onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                    placeholder="Brief description for blog listing..."
                    style={{ minHeight: 80 }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Content (HTML) *</label>
                  <textarea
                    className="form-input"
                    value={form.content}
                    onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                    required
                    placeholder="<h2>Your content here...</h2><p>Write your article...</p>"
                    style={{ minHeight: 200, fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    className="form-input"
                    value={form.tags}
                    onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                    placeholder="wedding, tips, photography"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setForm(p => ({ ...p, coverImage: e.target.files?.[0] || null }))}
                    className="form-input"
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))}
                  />
                  <span style={{ fontSize: 'var(--text-sm)' }}>Publish immediately</span>
                </label>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : editing ? 'Update Post' : 'Create Post'}
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

export default AdminBlog;
