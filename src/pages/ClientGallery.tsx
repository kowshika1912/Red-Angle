import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import api, { getImageUrl } from '../api/client';
import { Album, Image } from '../types';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';
import img5 from '../assets/Manifesting Marriage Official_ Instagram, Facebook _ Linktree.jpg';
import img6 from '../assets/South Indian Bridal Look ✨️.jpg';
import img7 from '../assets/Tamil Wedding in London.jpg';
import img8 from '../assets/Best Wedding Poses.jpg';
import img9 from '../assets/Dreamy Wedding Mehndi_ Classic & Detailed Indian Design❤️💍💫❤️.jpg';
import img10 from '../assets/Engagement.jpg';
import img11 from '../assets/The Wedding Story Of Two Crazy Adventurous People In Love - Shopzters.jpg';

const ClientGallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    const generateImages = (albumId: string, count: number) => {
      return Array.from({ length: count }).map((_, i) => ({
        id: `gen-${albumId}-${i}`,
        url: `https://picsum.photos/seed/${albumId}-${i}/800/800`
      }));
    };

    const fallbackAlbums = [
      { id: 'c1', title: 'Sharma Wedding Gallery', clientName: 'Mr. & Mrs. Sharma', coverImage: img7, _count: { images: 45 }, images: generateImages('sharma', 45) } as any,
      { id: 'c2', title: 'Corporate Event 2024', clientName: 'TechCorp Inc.', coverImage: img2, _count: { images: 120 }, images: generateImages('corporate', 120) } as any,
    ];

    api.get('/albums?clientGallery=true')
      .then(r => {
        if (r.data && r.data.length > 0) {
          setAlbums(r.data);
        } else {
          setAlbums(fallbackAlbums);
        }
      })
      .catch(() => {
        setAlbums(fallbackAlbums);
      })
      .finally(() => setLoading(false));
  }, []);

  const openAlbum = async (album: Album) => {
    setSelectedAlbum(album);
    try {
      const res = await api.get(`/albums/${album.id}`);
      setImages(res.data.images || []);
    } catch (error) {
      if ((album as any).images) {
        setImages((album as any).images);
      } else {
        setImages([]);
      }
    }
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Your Memories</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Client Gallery</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: 'var(--space-md) auto 0', textAlign: 'center' }}>
              Access your exclusive photo collections delivered by Red-Angle Studio
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
              {[1,2,3,4].map(i => (
                <div key={i} className="skeleton" style={{ height: 280, borderRadius: 'var(--radius-lg)' }} />
              ))}
            </div>
          ) : albums.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
              <Camera size={80} color="var(--text-muted)" strokeWidth={0.5} />
              <h3 style={{ marginTop: 'var(--space-lg)', color: 'var(--text-secondary)' }}>No Client Albums Yet</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-sm)' }}>
                Client galleries will appear here once they are published by our team.
              </p>
            </div>
          ) : (
            <motion.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {albums.map((album, i) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openAlbum(album)}
                  >
                    <div className="card-image">
                      {album.coverImage ? (
                        <img src={getImageUrl(album.coverImage)} alt={album.title} />
                      ) : (
                        <div className="img-placeholder" style={{ width: '100%', height: 220 }}>
                          <Camera size={40} color="rgba(212,165,87,0.15)" />
                        </div>
                      )}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(10,8,5,0.8) 0%, transparent 60%)',
                        display: 'flex', alignItems: 'flex-end', padding: 'var(--space-lg)',
                        opacity: 0, transition: 'opacity 0.3s',
                      }}
                      className="album-hover-overlay">
                        <span style={{ color: 'white', fontWeight: 600 }}>View Album →</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)' }}>{album.title}</h3>
                          {album.clientName && (
                            <p style={{ color: 'var(--gold-300)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                              {album.clientName}
                            </p>
                          )}
                        </div>
                        <span className="badge badge-gold">{album._count?.images || 0} photos</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Album Viewer Modal */}
      {selectedAlbum && (
        <div className="lightbox-overlay" onClick={() => setSelectedAlbum(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              width: '90vw', maxWidth: 1200,
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 'var(--space-xl)',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <div>
                <h2>{selectedAlbum.title}</h2>
                {selectedAlbum.clientName && <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{selectedAlbum.clientName}</p>}
              </div>
              <button onClick={() => setSelectedAlbum(null)} style={{ color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>
            <div style={{ overflow: 'auto', padding: 'var(--space-xl)', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-md)' }}>
                {images.map((img, i) => (
                  <div
                    key={img.id}
                    style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1' }}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={getImageUrl(img.url)} alt={img.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLightboxIndex(null)}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <button onClick={() => setLightboxIndex(null)} style={{ position: 'absolute', top: -40, right: 0, color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
            <img src={getImageUrl(images[lightboxIndex]?.url || '')} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }} />
            {lightboxIndex > 0 && (
              <button className="lightbox-nav lightbox-prev" onClick={() => setLightboxIndex(l => l! - 1)}>
                <ChevronLeft size={20} />
              </button>
            )}
            {lightboxIndex < images.length - 1 && (
              <button className="lightbox-nav lightbox-next" onClick={() => setLightboxIndex(l => l! + 1)}>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientGallery;
