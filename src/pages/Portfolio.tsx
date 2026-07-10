import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
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

const categories = [
  { key: '', label: 'All' },
  { key: 'WEDDING', label: 'Wedding' },
  { key: 'PRE_WEDDING', label: 'Pre-Wedding' },
  { key: 'CANDID', label: 'Candid' },
  { key: 'MATERNITY', label: 'Maternity' },
  { key: 'KIDS', label: 'Kids' },
  { key: 'FASHION', label: 'Fashion' },
  { key: 'CORPORATE', label: 'Corporate' },
  { key: 'COMMERCIAL', label: 'Commercial' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || '';
    setActiveCategory(cat);
  }, []);

  useEffect(() => {
    setLoading(true);
    
    const fallbackAlbums = [
      { id: '1', title: 'Royal Wedding - Sharma Family', category: 'WEDDING', description: 'A grand royal wedding celebration', _count: { images: 120 }, coverImage: img7, images: [{id:'i1', url: img7}] } as any,
      { id: '2', title: 'Priya & Arjun Pre-Wedding', category: 'PRE_WEDDING', description: 'Beautiful moments before the big day', _count: { images: 85 }, coverImage: img5, images: [{id:'i2', url: img5}] } as any,
      { id: '3', title: 'Fashion Week 2024', category: 'FASHION', description: 'Exclusive behind the scenes coverage', _count: { images: 200 }, coverImage: img6, images: [{id:'i3', url: img6}] } as any,
      { id: '4', title: 'Little Stars - Kids Collection', category: 'KIDS', description: 'Adorable kids portraits', _count: { images: 45 }, coverImage: img1, images: [{id:'i4', url: img1}] } as any,
      { id: '5', title: 'Corporate Gala', category: 'CORPORATE', description: 'Annual company celebration', _count: { images: 150 }, coverImage: img2, images: [{id:'i5', url: img2}] } as any,
      { id: '6', title: 'Maternity Magic', category: 'MATERNITY', description: 'Celebrating new life', _count: { images: 60 }, coverImage: img3, images: [{id:'i6', url: img3}] } as any,
      { id: '7', title: 'Best Wedding Poses', category: 'WEDDING', description: 'Classic wedding photography', _count: { images: 30 }, coverImage: img8, images: [{id:'i7', url: img8}] } as any,
      { id: '8', title: 'Dreamy Mehndi', category: 'WEDDING', description: 'Beautiful Indian design', _count: { images: 40 }, coverImage: img9, images: [{id:'i8', url: img9}] } as any,
      { id: '9', title: 'Engagement Ceremony', category: 'PRE_WEDDING', description: 'A beautiful beginning', _count: { images: 55 }, coverImage: img10, images: [{id:'i9', url: img10}] } as any,
      { id: '10', title: 'Crazy Adventurous People', category: 'CANDID', description: 'Candid love story', _count: { images: 65 }, coverImage: img11, images: [{id:'i10', url: img11}] } as any
    ];
    
    const filteredFallbacks = activeCategory 
      ? fallbackAlbums.filter(a => a.category === activeCategory)
      : fallbackAlbums;

    const url = activeCategory ? `/albums?category=${activeCategory}` : '/albums';
    api.get(url)
      .then(r => {
        if (r.data && r.data.length > 0) {
          setAlbums(r.data);
        } else {
          setAlbums(filteredFallbacks);
        }
      })
      .catch(() => {
        setAlbums(filteredFallbacks);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const openAlbum = async (album: Album) => {
    setSelectedAlbum(album);
    try {
      const res = await api.get(`/albums/${album.id}`);
      let imgs = res.data.images || [];
      if (imgs.length === 0) {
        imgs = Array.from({ length: 12 }).map((_, i) => ({
          id: `gen-${album.id}-${i}`,
          albumId: album.id,
          url: `https://picsum.photos/seed/${album.id}-${i}/800/800`,
          order: i,
          fileType: 'image',
          createdAt: new Date().toISOString()
        }));
      }
      setImages(imgs);
    } catch (error) {
      if ((album as any).images) {
        setImages((album as any).images);
      } else {
        setImages(Array.from({ length: 12 }).map((_, i) => ({
          id: `gen-${album.id}-${i}`,
          albumId: album.id,
          url: `https://picsum.photos/seed/${album.id}-${i}/800/800`,
          order: i,
          fileType: 'image',
          createdAt: new Date().toISOString()
        })));
      }
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="page-enter">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-tag" style={{ justifyContent: 'center' }}>Our Work</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Portfolio Gallery</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: 'var(--space-md) auto 0', textAlign: 'center' }}>
              Browse through our collection of carefully curated photography albums
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {/* Category Filters */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Albums Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card">
                  <div className="skeleton" style={{ height: 250 }} />
                  <div style={{ padding: 'var(--space-lg)' }}>
                    <div className="skeleton" style={{ height: 20, marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 14, width: '50%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}
              >
                {albums.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-4xl)' }}>
                    <Camera size={60} color="var(--text-muted)" />
                    <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-md)' }}>No albums found in this category yet.</p>
                  </div>
                ) : albums.map((album, i) => (
                  <motion.div
                    key={album.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    <div
                      className="card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openAlbum(album)}
                    >
                      <div className="card-image">
                        {album.coverImage ? (
                          <img src={getImageUrl(album.coverImage)} alt={album.title} loading="lazy" />
                        ) : (
                          <img src={`https://picsum.photos/seed/${album.id}/800/600`} alt={album.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        <div className="gallery-item-overlay">
                          <div>
                            <span className="badge badge-gold">{album.category.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)' }}>{album.title}</h3>
                        {album.description && (
                          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-sm)' }}>
                            {album.description}
                          </p>
                        )}
                        <p style={{ color: 'var(--gold-300)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                          {album._count?.images || 12} photos • Click to view
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Album Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlbum(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                width: '90vw',
                maxWidth: 1200,
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-xl)',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <div>
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>{selectedAlbum.title}</h2>
                  <span className="badge badge-gold">{selectedAlbum.category.replace('_', ' ')}</span>
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Images Grid */}
              <div style={{ overflow: 'auto', padding: 'var(--space-xl)', flex: 1 }}>
                {images.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                    <Camera size={60} color="var(--text-muted)" />
                    <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-md)' }}>No images in this album yet.</p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 'var(--space-md)',
                  }}>
                    {images.map((img, i) => (
                      <div
                        key={img.id}
                        className="gallery-item"
                        onClick={() => setLightboxIndex(i)}
                        style={{ cursor: 'pointer', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
                      >
                        {img.fileType === 'video' ? (
                          <video src={getImageUrl(img.url)} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                        ) : (
                          <img src={getImageUrl(img.url)} alt={img.caption || ''} style={{ width: '100%', height: 160, objectFit: 'cover' }} loading="lazy" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{ zIndex: 3000 }}
          >
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}><X size={24} /></button>
              <img
                src={getImageUrl(images[lightboxIndex].url)}
                alt={images[lightboxIndex].caption || ''}
              />
              {lightboxIndex > 0 && (
                <button className="lightbox-nav lightbox-prev" onClick={() => setLightboxIndex(lightboxIndex - 1)}>
                  <ChevronLeft size={20} />
                </button>
              )}
              {lightboxIndex < images.length - 1 && (
                <button className="lightbox-nav lightbox-next" onClick={() => setLightboxIndex(lightboxIndex + 1)}>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section style={{ padding: 'var(--space-4xl) 0', textAlign: 'center', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 className="section-title">Love What You See?</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
            Let's create something beautiful together
          </p>
          <Link to="/contact" className="btn btn-primary">Book Your Session</Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
