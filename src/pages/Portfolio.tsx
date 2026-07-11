import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import api, { getImageUrl } from '../api/client';
import { Album, Image } from '../types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Assets
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

const customEasing: [number, number, number, number] = [0.6, 0.01, -0.05, 0.95];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: customEasing }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: customEasing }
  }
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Reference for the gallery container to trigger smooth scrolling
  const galleryRef = useRef<HTMLElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || '';
    setActiveCategory(cat);
  }, []);

  useEffect(() => {
    setLoading(true);

    const fallbackAlbums = [
      { id: '1', title: 'South Indian Bridal Look ✨', category: 'WEDDING', description: 'Intricate details of traditional bridal elegance.', _count: { images: 45 }, coverImage: img6, images: [{ id: 'i1', url: img6 }] } as any,
      { id: '2', title: 'Priya & Arjun Pre-Wedding', category: 'PRE_WEDDING', description: 'Beautiful moments before the big day', _count: { images: 85 }, coverImage: img5, images: [{ id: 'i2', url: img5 }] } as any,
      { id: '3', title: 'Little Stars - Kids Collection', category: 'KIDS', description: 'Adorable kids portraits', _count: { images: 32 }, coverImage: img1, images: [{ id: 'i4', url: img1 }] } as any,
      { id: '4', title: 'Tamil Wedding - London', category: 'WEDDING', description: 'A grand traditional wedding celebration', _count: { images: 120 }, coverImage: img7, images: [{ id: 'i1', url: img7 }] } as any,
      { id: '5', title: 'Maternity Magic', category: 'MATERNITY', description: 'Celebrating new life and beautiful beginnings', _count: { images: 24 }, coverImage: img3, images: [{ id: 'i6', url: img3 }] } as any,
      { id: '6', title: 'Dreamy Mehndi Design', category: 'WEDDING', description: 'Classic & detailed Indian designs', _count: { images: 40 }, coverImage: img9, images: [{ id: 'i8', url: img9 }] } as any,
      { id: '7', title: 'Fashion Week Exclusives', category: 'FASHION', description: 'Exclusive behind the scenes coverage', _count: { images: 200 }, coverImage: img2, images: [{ id: 'i3', url: img2 }] } as any,
      { id: '8', title: 'Candid Love Stories', category: 'CANDID', description: 'The story of two adventurous people', _count: { images: 65 }, coverImage: img11, images: [{ id: 'i10', url: img11 }] } as any
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
    <div className="page-enter" style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111111' }}>

      {/* Page Hero Section */}
      <section className="page-hero" style={{ padding: '6rem 0 4rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'center' }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <Sparkles size={16} color="#d4a557" />
              <span style={{
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#d4a557',
              }}>
                Our Work
              </span>
              <Sparkles size={16} color="#d4a557" />
            </motion.div>

            {/* Premium Staggered Text Reveal */}
            <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
              <motion.h1
                variants={textRevealVariants}
                style={{
                  fontFamily: 'var(--font-heading, serif)',
                  fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                  lineHeight: 1,
                  margin: 0,
                  color: '#111111',
                }}
              >
                Portfolio
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                variants={textRevealVariants}
                style={{
                  fontFamily: 'var(--font-heading, serif)',
                  fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                  lineHeight: 1,
                  margin: 0,
                  background: 'linear-gradient(180deg, #111111 0%, rgba(17,17,17,0.4) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Bodoni MT', 'Didot', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  paddingRight: '0.5rem',
                  color: '#d4a557',
                  WebkitTextFillColor: '#d4a557'
                }}>The</span> Gallery.
              </motion.h1>
            </div>
            
            <motion.p variants={itemVariants} style={{ color: '#666666', maxWidth: 600, margin: '2rem auto 0', textAlign: 'center', lineHeight: '1.8', fontSize: '1.125rem' }}>
              Browse through our collection of carefully curated photography albums
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery Display Section */}
      <section
        ref={galleryRef}
        className="section"
        style={{ paddingTop: '2rem', paddingBottom: '4rem', scrollMarginTop: '2rem' }}
      >
        <div className="container">
          {/* Category Filters */}
          <div className="filter-tabs" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '99px',
                  border: activeCategory === cat.key ? '1px solid #111' : '1px solid #eaeaea',
                  backgroundColor: activeCategory === cat.key ? '#111' : '#fff',
                  color: activeCategory === cat.key ? '#fff' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Albums Content / Loader */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', overflow: 'hidden', padding: '3rem 0' }}>
              {Array.from({ length: 5 }).map((_, i) => {
                let scale = 1;
                let opacity = 1;
                if (i !== 2) { scale = 0.8; opacity = 0.5; }
                if (i === 0 || i === 4) { scale = 0.6; opacity = 0.2; }
                return (
                  <div key={i} className="card" style={{ width: '320px', height: '480px', background: '#fafafa', borderRadius: '24px', overflow: 'hidden', opacity, transform: `scale(${scale})`, transition: 'all 0.3s', flexShrink: 0 }}>
                    <div className="skeleton" style={{ height: '100%', backgroundColor: '#eee' }} />
                  </div>
                )
              })}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', overflow: 'hidden' }}
              >
                {albums.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <Camera size={60} color="#cccccc" style={{ margin: '0 auto' }} />
                    <p style={{ color: '#999999', marginTop: '1rem' }}>No albums found in this category yet.</p>
                  </div>
                ) : (
                  <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 60,
                      depth: 150,
                      modifier: 1.5,
                      slideShadows: true,
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="portfolio-swiper"
                    style={{ padding: '4rem 0', width: '100%' }}
                  >
                    {[...albums, ...albums, ...albums].map((album, index) => (
                      <SwiperSlide key={`${album.id}-${index}`} style={{ width: '300px', height: '460px', borderRadius: '24px', overflow: 'hidden' }}>
                        <div
                          className="glass-card"
                          onClick={() => openAlbum(album)}
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                          }}
                        >
                          {album.coverImage ? (
                            <img src={getImageUrl(album.coverImage)} alt={album.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <img src={`https://picsum.photos/seed/${album.id}/800/1000`} alt={album.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}

                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                            padding: '3rem 1.5rem 1.5rem',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            height: '60%',
                          }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{album.title}</h3>
                            {album.description && (
                              <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5', color: '#ffffff', opacity: 0.95, textShadow: '0 1px 4px rgba(0,0,0,0.8)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {album.description}
                              </p>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                              <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.8)' }}>
                                {album.category.replace('_', ' ')}
                              </p>
                              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 500, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                {album._count?.images || 12} photos
                              </span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Album Modal Detail Overlay */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlbum(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#ffffff',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                width: '100%',
                maxWidth: 1200,
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ position: 'relative', width: '100%', height: '450px', flexShrink: 0, backgroundColor: '#111', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: -40, zIndex: 0 }}>
                  <img
                    src={selectedAlbum.coverImage ? getImageUrl(selectedAlbum.coverImage) : `https://picsum.photos/seed/${selectedAlbum.id}/1200/600`}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px)', opacity: 0.5 }}
                  />
                </div>

                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                  <img
                    src={selectedAlbum.coverImage ? getImageUrl(selectedAlbum.coverImage) : `https://picsum.photos/seed/${selectedAlbum.id}/1200/600`}
                    alt={selectedAlbum.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                  padding: '3rem 2rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  zIndex: 2
                }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{selectedAlbum.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.9)' }}>
                      {selectedAlbum.category.replace('_', ' ')}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', color: '#ffffff', fontWeight: 500, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {selectedAlbum._count?.images || 12} photos
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAlbum(null)}
                  style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
                    background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff',
                    cursor: 'pointer', padding: '0.5rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = '#111'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.color = '#fff'; }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ overflow: 'auto', padding: '3rem 4rem', flex: 1, backgroundColor: '#fdfdfd' }}>
                <div style={{ maxWidth: '800px' }}>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#111', marginBottom: '1.5rem' }}>About this Collection</h3>
                  <p style={{ fontSize: '1.125rem', color: '#555', lineHeight: '1.8' }}>
                    {selectedAlbum.description || "A beautiful collection of moments captured in time. This album showcases our attention to detail, lighting, and composition to deliver stunning photography that tells a unique story."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Mode */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="lightbox-content" onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={closeLightbox}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#111', cursor: 'pointer', zIndex: 3010 }}>
                <X size={32} />
              </button>
              <img
                src={getImageUrl(images[lightboxIndex].url)}
                alt={images[lightboxIndex].caption || ''}
                style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              />
              {lightboxIndex > 0 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  style={{ position: 'absolute', left: '2rem', background: '#fff', border: '1px solid #eaeaea', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <ChevronLeft size={24} color="#111" />
                </button>
              )}
              {lightboxIndex < images.length - 1 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  style={{ position: 'absolute', right: '2rem', background: '#fff', border: '1px solid #eaeaea', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <ChevronRight size={24} color="#111" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action (CTA) */}
      <section style={{ padding: '5rem 0', textAlign: 'center', background: '#fafafa', borderTop: '1px solid #eaeaea' }}>
        <div className="container">
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: '300', color: '#111' }}>Love What You See?</h2>
          <p style={{ color: '#666', marginTop: '1rem', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
            Let's create something beautiful together.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            backgroundColor: '#111',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '99px',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111'}
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;