import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Film, Star, Award, Users, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import api, { getImageUrl } from '../api/client';
import CircularGallery from '../components/layout/CircularGallery';
import PixelTransition from '../components/layout/PixelTransition';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';
import img5 from '../assets/Manifesting Marriage Official_ Instagram, Facebook _ Linktree.jpg';
import img6 from '../assets/South Indian Bridal Look ✨️.jpg';
import img7 from '../assets/Tamil Wedding in London.jpg';
import img8 from '../assets/videoframe_wed.png';

// --- STATS COUNTER ---
const CounterStat = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '150px',
      minWidth: '150px'
    }}>
      {/* Background large number */}
      <div style={{ 
        fontSize: 'clamp(5rem, 8vw, 9rem)', 
        fontFamily: 'var(--font-heading, serif)', 
        fontWeight: 400, 
        color: 'rgba(0,0,0,0.06)',
        lineHeight: 1,
        position: 'absolute',
        zIndex: 1,
        userSelect: 'none',
        whiteSpace: 'nowrap'
      }}>
        {count}{suffix}
      </div>
      
      {/* Foreground Label */}
      <div style={{ 
        position: 'relative',
        zIndex: 2,
        fontSize: '0.75rem', 
        color: 'var(--text-primary)', 
        fontWeight: 600,
        textTransform: 'uppercase', 
        letterSpacing: '0.2em',
        whiteSpace: 'nowrap'
      }}>
        {label}
      </div>
    </div>
  );
};

// --- DATA ---
const marqueeItems = [
  'Fine Art Weddings', 'Cinematic Films', 'Editorial Portraits', 'Maternity', 'Fashion Lookbooks', 'Luxury Events'
];

const services = [
  { icon: <Camera size={28} />, title: 'Wedding Photography', desc: 'Timeless documentation of your most cherished day, captured with artistry and emotion.', num: '01', image: img7 },
  { icon: <Film size={28} />, title: 'Cinematography', desc: 'Cinematic films that tell the story of your special moments in stunning detail.', num: '02', image: img8 },
  { icon: <Star size={28} />, title: 'Pre-Wedding Shoots', desc: 'Creative and romantic sessions that celebrate your love story before the big day.', num: '03', image: img5 },
  { icon: <ImageIcon size={28} />, title: 'Maternity & Kids', desc: 'Beautiful portraits celebrating new life and the joy of childhood.', num: '04', image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop" },
  { icon: <Award size={28} />, title: 'Fashion Photography', desc: 'High-impact commercial and editorial photography for brands and individuals.', num: '05', image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" },
  { icon: <Users size={28} />, title: 'Corporate Events', desc: 'Professional coverage of corporate events, conferences, and brand launches.', num: '06', image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop" },
];

const heroImages = [img1, img2, img3, img5, img6, img7];

// --- PREMIUM STACKED CARD COMPONENT ---
const StackedCard = ({ service, index, activeIndex, total }: any) => {
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  const y = isActive ? 0 : isPast ? -40 : 800;
  const scale = isActive ? 1 : isPast ? 0.95 : 1;
  const rotationVal = (index % 2 === 0 ? 1.5 : -1.5) * (1 - index * 0.1);
  const rotate = isActive ? 0 : isPast ? rotationVal : 0;
  const opacity = isActive ? 1 : isPast ? 0.3 : 1;

  return (
    <motion.div
      initial={false}
      animate={{ y, scale, rotate, opacity }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute', width: '100%', height: '100%',
        zIndex: index,
        transformOrigin: 'bottom center',
        willChange: 'transform, opacity'
      }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        borderRadius: '2rem', overflow: 'hidden',
        border: '1px solid rgba(212,165,87,0.2)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        background: 'var(--color-bg-2)'
      }}>
        {/* Crisp Image without full blur */}
        <img
          src={service.image}
          alt={service.title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '70%', objectFit: 'cover' }}
        />

        {/* Precision Gradient: Clear at top, solid at bottom for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(3,4,4,0) 0%, rgba(3,4,4,0.6) 40%, rgba(3,4,4,1) 75%)'
        }} />

        {/* Top Icon */}
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'var(--gold-300, #d4a557)' }}>
          {service.icon}
        </div>

        {/* Content Aligned to Bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '3rem', display: 'flex', flexDirection: 'column' }}>

          {/* Watermark Number Effect */}
          <div style={{
            position: 'absolute', right: '-1rem', bottom: '-2rem',
            fontSize: '12rem', fontFamily: 'var(--font-heading, serif)',
            color: 'rgba(212,165,87,0.05)', lineHeight: 1, pointerEvents: 'none'
          }}>
            {service.num}
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.15em',
              fontSize: '0.7rem', color: 'var(--gold-300, #d4a557)',
              borderBottom: '1px solid rgba(212,165,87,0.3)', paddingBottom: '0.3rem', marginBottom: '1rem'
            }}>
              Specialty {service.num}
            </div>

            <h3 style={{
              fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontFamily: 'var(--font-heading, serif)',
              color: '#ffffff', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 300
            }}>
              {service.title}
            </h3>

            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '90%', margin: 0 }}>
              {service.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN HOME COMPONENT ---
const Home = () => {
  const heroRef = useRef(null);
  const servicesSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '80%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  useEffect(() => {
    if (isServicesHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000); // Autoplay interval
    return () => clearInterval(timer);
  }, [isServicesHovered]);

  const handleNextService = () => setActiveIndex((prev) => (prev + 1) % services.length);
  const handlePrevService = () => setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

  const [albums, setAlbums] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentBg((prev) => (prev + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fallbackAlbums = [
      { id: '1', title: 'Royal Symphony', category: 'WEDDING', _count: { images: 120 }, coverImage: img7 },
      { id: '2', title: 'Eternal Promise', category: 'PRE_WEDDING', _count: { images: 85 }, coverImage: img5 },
      { id: '3', title: 'Vogue & Vintage', category: 'FASHION', _count: { images: 200 }, coverImage: img6 },
      { id: '4', title: 'Innocence', category: 'KIDS', _count: { images: 45 }, coverImage: img1 },
      { id: '5', title: 'Corporate Elegance', category: 'CORPORATE', _count: { images: 150 }, coverImage: img2 },
      { id: '6', title: 'New Beginnings', category: 'MATERNITY', _count: { images: 60 }, coverImage: img3 }
    ];

    api.get('/albums?limit=6')
      .then(r => setAlbums(r.data && r.data.length > 0 ? r.data.slice(0, 6) : fallbackAlbums))
      .catch(() => setAlbums(fallbackAlbums));

    api.get('/testimonials').then(r => setTestimonials(r.data.slice(0, 4))).catch(() => { });
  }, []);

  const [portfolioIndex, setPortfolioIndex] = useState(0);

  useEffect(() => {
    if (albums.length === 0) return;
    const timer = setInterval(() => {
      setPortfolioIndex((prev) => (prev + 1) % Math.max(1, albums.length * 3));
    }, 4000);
    return () => clearInterval(timer);
  }, [albums.length]);

  const safeAlbums = albums.length > 0 && albums.length < 4 
    ? [...albums.map((a: any) => ({...a, uniqueId: a.id + '-1'})), ...albums.map((a: any) => ({...a, uniqueId: a.id + '-2'})), ...albums.map((a: any) => ({...a, uniqueId: a.id + '-3'}))]
    : albums.map((a: any) => ({...a, uniqueId: a.id}));

  const visibleAlbums = safeAlbums.length > 0 ? [
    safeAlbums[portfolioIndex % safeAlbums.length],
    safeAlbums[(portfolioIndex + 1) % safeAlbums.length],
    safeAlbums[(portfolioIndex + 2) % safeAlbums.length],
  ] : [];

  const resolvedTestimonials = testimonials.length > 0 ? testimonials : [
    { name: 'Priya & Rahul', role: 'Wedding', content: 'Red-Angle did not just take photos; they captured the soul of our wedding. An absolute masterpiece of light and emotion.' },
    { name: 'Anjali Mehta', role: 'Maternity', content: 'Elegant, comforting, and deeply profound. The images look like they belong in a high-fashion editorial.' },
    { name: 'TechCorp Solutions', role: 'Corporate Client', content: 'Outstanding corporate photography! The team delivered high-quality images that perfectly represented our brand. Highly recommended.' }
  ];

  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    if (resolvedTestimonials.length === 0) return;
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % Math.max(1, resolvedTestimonials.length * 3));
    }, 5000); // swipe every 5s
    return () => clearInterval(timer);
  }, [resolvedTestimonials.length]);

  const safeTestimonials = resolvedTestimonials.length > 0 && resolvedTestimonials.length < 4
    ? [...resolvedTestimonials.map((t: any) => ({...t, uniqueId: t.name + '-1'})), ...resolvedTestimonials.map((t: any) => ({...t, uniqueId: t.name + '-2'})), ...resolvedTestimonials.map((t: any) => ({...t, uniqueId: t.name + '-3'}))]
    : resolvedTestimonials.map((t: any) => ({...t, uniqueId: t.name}));

  const visibleTestimonials = safeTestimonials.length > 0 ? [
    safeTestimonials[testiIndex % safeTestimonials.length],
    safeTestimonials[(testiIndex + 1) % safeTestimonials.length],
    safeTestimonials[(testiIndex + 2) % safeTestimonials.length],
  ] : [];

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--text-primary)', overflowX: 'hidden' }}>

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY, background: '#000' }}>
          {heroImages.map((src, index) => (
            <motion.div
              key={src}
              initial={false}
              animate={{ opacity: currentBg === index ? 1 : 0, scale: currentBg === index ? 1 : 1.05 }}
              transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("${src}")`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'contrast(1.1) brightness(0.9)',
                zIndex: currentBg === index ? 1 : 0
              }}
            />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 2 }} />
        </motion.div>

        {/* ==================== HERO UI OVERLAYS ==================== */}
        
        {/* Bottom Left: Social Links */}
        <div className="desktop-only" style={{ position: 'absolute', bottom: '3rem', left: '4rem', zIndex: 10, display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="#" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '0.2em', textDecoration: 'none', fontWeight: 600 }}>FB</a>
          <span style={{ color: '#fff', opacity: 0.5 }}>—</span>
          <a href="#" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '0.2em', textDecoration: 'none', fontWeight: 600 }}>IN</a>
        </div>

        {/* Bottom Center: Pagination Diamonds */}
        <div className="desktop-only" style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {heroImages.map((_, idx) => (
            <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => setCurrentBg(idx)}>
              <div style={{ 
                width: '6px', height: '6px', background: currentBg === idx ? '#fff' : 'rgba(255,255,255,0.4)', 
                transform: 'rotate(45deg)', transition: 'background 0.3s' 
              }} />
              {currentBg === idx && (
                <div style={{ position: 'absolute', width: '24px', height: '24px', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%' }} />
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Vertical Navigation */}
        <div style={{ position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <button onClick={() => setCurrentBg((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
             <ArrowRight size={18} style={{ transform: 'rotate(-90deg)', opacity: 0.7 }} />
          </button>
          <div style={{ color: '#fff', fontSize: '0.8rem', letterSpacing: '0.2em', fontWeight: 500 }}>
            {currentBg + 1} <span style={{ opacity: 0.5, margin: '0 4px' }}>/</span> {heroImages.length}
          </div>
          <button onClick={() => setCurrentBg((prev) => (prev + 1) % heroImages.length)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
            <ArrowRight size={18} style={{ transform: 'rotate(90deg)', opacity: 0.7 }} />
          </button>
        </div>

        {/* Floating WhatsApp */}
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '50px', height: '50px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>

      </section>

      {/* ==================== PREMIUM MARQUEE ==================== */}
      <div style={{ padding: '2rem 0', background: 'var(--color-surface)', borderBottom: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'scrollMarquee 30s linear infinite' }}>
          <style>{`@keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem' }}>
              <span style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{item}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold-300, #d4a557)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ==================== ABOUT INTRO ==================== */}
      <section style={{ padding: '8rem 5%', position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(to bottom, var(--color-surface), var(--color-bg))' }}>
        {/* Subtle Watermark */}
        <div style={{ 
          position: 'absolute', top: '5%', right: '5%', 
          fontSize: '18rem', fontFamily: 'var(--font-heading)', color: 'rgba(212,165,87,0.03)', 
          lineHeight: 1, zIndex: 0, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap'
        }}>
          EST. 2014
        </div>

        <div className="home-about-grid" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Text Content */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '1px', background: 'var(--gold-300)' }} />
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--gold-300)', fontWeight: 600 }}>The Vision</div>
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
              Artistry in <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--text-muted)' }}>Every Frame</span>
            </h2>
            
            <div style={{ borderLeft: '1px solid rgba(212, 165, 87, 0.3)', paddingLeft: '2rem', marginLeft: '0.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '90%' }}>
                Red-Angle Studio is a premium photography house. We don't just take pictures; we craft cinematic legacies. With over a decade of dedication, we specialize in immortalizing life's grandest milestones and intimate whispers.
              </p>
              <Link to="/about" style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', 
                textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 500,
                textDecoration: 'none', borderBottom: '1px solid var(--gold-300)', paddingBottom: '0.5rem', 
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.gap = '1.25rem'; e.currentTarget.style.color = 'var(--gold-300)'; }}
              onMouseOut={(e) => { e.currentTarget.style.gap = '0.75rem'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                Discover Our Story <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Image Composition */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', maxWidth: '420px', width: '100%', zIndex: 1 }}>
              
              {/* Main Image */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
                style={{ aspectRatio: '4/5', borderRadius: '1rem', overflow: 'hidden', position: 'relative', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <img src={img7} alt="Studio Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(212,165,87,0.1), transparent)' }} />
              </motion.div>

              {/* Secondary Overlapping Image (Floating) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } }} viewport={{ once: true }}
                animate={{ y: [0, -15, 0] }} transition={{ y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
                className="floating-image"
                style={{ 
                  borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  border: '6px solid var(--color-surface)'
                }}
              >
                <img src={img5} alt="Editorial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
              
              {/* Overlapping Badge (Floating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 } }} viewport={{ once: true }}
                animate={{ y: [0, 10, 0] }} transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } }}
                className="floating-badge"
                style={{ 
                  background: 'var(--color-surface-2)', 
                  padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(212,165,87,0.2)', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading, serif)', color: 'var(--gold-300)', lineHeight: 1 }}>10+</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600 }}>Years of Mastery</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section style={{ padding: '8rem 5%', background: 'var(--color-surface)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="stats-grid"
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}><CounterStat end={123} label="Cup of Coffee" /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}><CounterStat end={743} label="Happy Couples" /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}><CounterStat end={15} label="Years of Passion" /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}><CounterStat end={54} label="Destinations" /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}><CounterStat end={954} label="Ceremonies" /></motion.div>
        </motion.div>
      </section>

      {/* ==================== SERVICES (CARD SWAP STACK) ==================== */}
      <div ref={servicesSectionRef} style={{ position: 'relative', background: 'var(--color-bg-2)', padding: '4rem 0', minHeight: '85vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Subtle Ambient Glow behind the section */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vh', background: 'radial-gradient(ellipse, rgba(10,30,25,0.4) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div className="home-services-grid" style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', padding: '0 5%' }}>

              {/* Left Column: Typography & Progress */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', color: 'var(--gold-300, #d4a557)', marginBottom: '1.5rem' }}>
                  Our Repertoire
                </div>

                <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: '2rem', fontWeight: 400 }}>
                  Signature <br />
                  <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Collections</span>
                </h2>

                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3.5rem', maxWidth: '420px' }}>
                  Scroll to explore our specialized disciplines. Each domain is approached with the distinct Red-Angle cinematic philosophy.
                </p>

                {/* Premium Progress Track */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading, serif)', fontStyle: 'italic' }}>
                    0{activeIndex + 1}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flex: 1, maxWidth: '200px' }}>
                    {services.map((_, idx) => (
                      <div key={idx} style={{
                        flex: 1, height: '2px', borderRadius: '2px',
                        background: activeIndex === idx ? 'var(--gold-300, #d4a557)' : 'rgba(0,0,0,0.1)',
                        boxShadow: activeIndex === idx ? '0 0 10px rgba(212,165,87,0.5)' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }} />
                    ))}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#444', fontFamily: 'var(--font-heading, serif)', fontStyle: 'italic' }}>
                    0{services.length}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                  <button onClick={handlePrevService} style={{ background: 'transparent', border: '1px solid rgba(212,165,87,0.3)', color: 'var(--gold-300, #d4a557)', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background='rgba(212,165,87,0.1)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={handleNextService} style={{ background: 'transparent', border: '1px solid rgba(212,165,87,0.3)', color: 'var(--gold-300, #d4a557)', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background='rgba(212,165,87,0.1)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div 
                style={{ position: 'relative', height: '500px', width: '100%', perspective: '1200px' }}
                onMouseEnter={() => setIsServicesHovered(true)}
                onMouseLeave={() => setIsServicesHovered(false)}
              >
                {services.map((service, index) => (
                  <StackedCard
                    key={service.num}
                    service={service}
                    index={index}
                    activeIndex={activeIndex}
                    total={services.length}
                  />
                ))}
              </div>

        </div>
      </div>


      {/* ==================== FEATURED WORK ==================== */}
      <section style={{ padding: '8rem 5% 3rem 5%', background: 'var(--color-surface)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'var(--gold-300, #d4a557)', marginBottom: '1rem' }}>Portfolio</div>
              <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1 }}>Curated Art</h2>
            </div>
            <style>{`
              .view-all-link { display: none; }
              @media (min-width: 768px) { .view-all-link { display: flex; } }
            `}</style>
            <Link to="/portfolio" className="view-all-link" style={{ alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', textDecoration: 'none' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ height: '600px', position: 'relative', margin: '0 -5vw', overflow: 'hidden' }}>
            <CircularGallery
              bend={3}
              textColor="var(--gold-300)"
              borderRadius={0.05}
              scrollEase={0.02}
              items={useMemo(() => albums.map((album: any) => ({
                image: album.coverImage ? getImageUrl(album.coverImage) : img2,
                text: album.title
              })), [albums])}
              fontUrl="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap"
              font="italic 30px 'Playfair Display'"
            />
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section style={{ padding: '3rem 5% 4rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212,165,87,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'var(--gold-300, #d4a557)', marginBottom: '1rem' }}>Praise</div>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '4rem' }}>Words of Love</h2>

          <div className="testimonial-track">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t, i) => (
                <motion.div 
                  key={t.uniqueId} 
                  layout
                  initial={{ opacity: 0, x: 100, scale: 0.9 }} 
                  animate={{ opacity: 1, x: 0, scale: 1 }} 
                  exit={{ opacity: 0, x: -100, scale: 0.9 }} 
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ flex: '1 1 calc(33.333% - 1.333rem)', minWidth: '300px', maxWidth: '100%' }}
                >
                  <PixelTransition
                    firstContent={
                      <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '2rem', textAlign: 'center', overflow: 'hidden' }}>
                        <img src={heroImages[i % heroImages.length]} alt={t.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                          <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.name}</div>
                          <div style={{ color: 'var(--gold-300, #d4a557)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '0.5rem' }}>{t.role}</div>
                        </div>
                      </div>
                    }
                    secondContent={
                      <div style={{ width: '100%', height: '100%', textAlign: 'left', padding: '2.5rem', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ color: 'var(--gold-300, #d4a557)', fontSize: '3rem', fontFamily: 'serif', lineHeight: 0.5, marginBottom: '1.5rem' }}>"</div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{t.content}</p>
                      </div>
                    }
                    gridSize={12}
                    pixelColor="var(--gold-300, #d4a557)"
                    animationStepDuration={0.4}
                    aspectRatio="100%"
                    style={{ width: '100%', height: '100%', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'var(--color-surface)' }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section style={{ padding: '4rem 5% 4rem 5%', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'linear-gradient(to bottom, var(--color-surface), var(--color-bg))' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            Let's create your <br /> <span style={{ fontStyle: 'italic', color: 'var(--gold-300, #d4a557)' }}>Legacy</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
            Book a private consultation to discuss your vision, aesthetic, and how we can bring it to life.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--text-primary)', color: 'var(--color-bg)',
              padding: '1.2rem 3rem', borderRadius: '3rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              Inquire Now <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;