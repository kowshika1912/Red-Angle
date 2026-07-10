import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, X } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import api, { getImageUrl } from '../../api/client';
import { Album, Image } from '../../types';
import toast from 'react-hot-toast';

const AdminImages = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [albumRes, imagesRes] = await Promise.all([
        api.get(`/albums/${id}`),
        api.get(`/images/${id}`),
      ]);
      setAlbum(albumRes.data);
      setImages(imagesRes.data);
    } catch {
      toast.error('Failed to load album');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !id) return;
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('images', f));

    try {
      await api.post(`/images/upload/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      toast.success(`${files.length} file(s) uploaded successfully`);
      load();
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/images/${imageId}`);
      setImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <div className="loading-spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <Link to="/admin/albums" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="admin-title">{album?.title || 'Album'}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
              {images.length} photos • {album?.category?.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
        style={{ marginBottom: 'var(--space-2xl)', cursor: 'pointer' }}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*,video/*"
          style={{ display: 'none' }}
          onChange={e => handleUpload(e.target.files)}
        />
        <Upload size={40} color="var(--text-muted)" style={{ margin: '0 auto var(--space-md)' }} />
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
          {uploading ? `Uploading... ${progress}%` : 'Drag & Drop or Click to Upload'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
          Supports: JPG, PNG, WebP, MP4, MOV (up to 100MB per file)
        </p>

        {uploading && (
          <div style={{
            width: '100%', maxWidth: 400, height: 4,
            background: 'var(--color-border)',
            borderRadius: 2, margin: 'var(--space-md) auto 0',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--gradient-gold)',
              transition: 'width 0.3s',
            }} />
          </div>
        )}
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--text-muted)' }}>
          <p>No images yet. Upload your first photos above!</p>
        </div>
      ) : (
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          <AnimatePresence>
            {images.map(img => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  group: 'item',
                }}
                className="image-grid-item"
              >
                {img.fileType === 'video' ? (
                  <video
                    src={getImageUrl(img.url)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    muted
                  />
                ) : (
                  <img
                    src={getImageUrl(img.url)}
                    alt={img.caption || ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                )}

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
                  className="image-overlay"
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <button
                    onClick={() => handleDelete(img.id)}
                    style={{
                      background: 'rgba(248,113,113,0.2)',
                      border: '1px solid rgba(248,113,113,0.5)',
                      borderRadius: '50%',
                      padding: '0.5rem',
                      color: '#f87171',
                      display: 'flex',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {img.fileType === 'video' && (
                  <div style={{
                    position: 'absolute', top: 4, right: 4,
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: 4,
                    padding: '2px 6px',
                    fontSize: '0.65rem',
                    color: 'white',
                  }}>
                    VIDEO
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AdminLayout>
  );
};

export default AdminImages;
