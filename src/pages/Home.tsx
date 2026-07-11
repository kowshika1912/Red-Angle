import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Film, Star, Award, Users, Image as ImageIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import api, { getImageUrl } from '../api/client';

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
      padding: '2rem',
      background: 'rgba(0, 0, 0, 0.02)',
      border: '1px solid rgba(212, 165, 87, 0.1)',
      borderRadius: '1rem',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      transition: 'transform 0.4s ease, border-color 0.4s ease'
    }}
      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'rgba(212, 165, 87, 0.4)'; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(212, 165, 87, 0.1)'; }}
    >
      <div style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontFamily: 'var(--font-heading, serif)', fontWeight: 400, color: 'var(--gold-300, #d4a557)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '1rem' }}>
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

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3500); // Autoplay interval
    return () => clearInterval(timer);
  }, []);

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
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY, background: 'var(--color-bg)' }}>
          {/* Background removed as requested */}
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, width: '100%', padding: '0 5%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.85rem', color: 'var(--gold-300, #d4a557)', marginBottom: '1.5rem' }}>
                Premium Photography Studio
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.05, margin: '0 0 2rem 0', fontWeight: 300, color: 'var(--text-primary)' }}>
                Capturing <br />
                <span style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>The Ethereal</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.8, marginBottom: '3rem' }}>
                Where every frame is a masterpiece. Professional curation of light, shadow, and your most intimate moments.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/portfolio" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--gold-300, #d4a557)', color: '#fff',
                  padding: '1rem 2rem', borderRadius: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none'
                }}>
                  View Portfolio <ArrowRight size={16} />
                </Link>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.3)',
                  padding: '1rem 2rem', borderRadius: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', textDecoration: 'none'
                }}>
                  Book Session
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.6 }}>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--gold-300, #d4a557))' }} />
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem' }}>Scroll</span>
        </div>
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
      <section style={{ padding: '10rem 5%', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}>
            <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'var(--gold-300, #d4a557)', marginBottom: '1rem' }}>The Vision</div>
            <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
              Artistry in <br /><span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Every Frame</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Red-Angle Studio is a premium photography house. We don't just take pictures; we craft cinematic legacies. With over a decade of dedication, we specialize in immortalizing life's grandest milestones and intimate whispers.
            </p>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', textDecoration: 'none', borderBottom: '1px solid var(--gold-300, #d4a557)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
              Discover Our Story <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
              <img src={img7} alt="Studio Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(212,165,87,0.2), transparent)' }} />
            </div>
            {/* Overlapping Badge */}
            <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', background: 'var(--color-surface-2)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading, serif)', color: 'var(--gold-300, #d4a557)', lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Years of Mastery</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section style={{ padding: '5rem 5%', background: 'var(--color-surface)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <CounterStat end={500} suffix="+" label="Weddings" />
          <CounterStat end={2000} suffix="+" label="Clients" />
          <CounterStat end={50} suffix="K+" label="Frames Delivered" />
          <CounterStat end={15} label="Awards" />
        </div>
      </section>

      {/* ==================== SERVICES (CARD SWAP STACK) ==================== */}
      <div ref={servicesSectionRef} style={{ position: 'relative', background: 'var(--color-bg-2)', padding: '8rem 0', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Subtle Ambient Glow behind the section */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vh', background: 'radial-gradient(ellipse, rgba(10,30,25,0.4) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', padding: '0 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

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
              </div>

              <div style={{ position: 'relative', height: '650px', width: '100%', perspective: '1200px' }}>
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

      {/* ==================== PARALLAX TEXT ROW ==================== */}
      <div style={{ padding: '5rem 0', overflow: 'hidden', background: 'var(--color-bg)' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'scrollMarquee 20s linear infinite reverse' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              <span style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'var(--font-heading, serif)', color: 'var(--color-surface-2)', WebkitTextStroke: '1px rgba(0,0,0,0.1)', paddingRight: '4rem' }}>RED-ANGLE</span>
              <span style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontFamily: 'var(--font-heading, serif)', color: 'var(--text-primary)', paddingRight: '4rem' }}>CINEMA</span>
            </div>
          ))}
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

          <div style={{ display: 'flex', gap: '2rem', overflow: 'hidden', padding: '1rem', margin: '0 -1rem' }}>
            <AnimatePresence mode="popLayout">
              {visibleAlbums.map((album, i) => (
                <motion.div 
                  key={album.uniqueId} 
                  layout
                  initial={{ opacity: 0, x: 100, scale: 0.9 }} 
                  animate={{ opacity: 1, x: 0, scale: 1 }} 
                  exit={{ opacity: 0, x: -100, scale: 0.9 }} 
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ flex: '1 1 calc(33.333% - 1.333rem)', minWidth: '300px', maxWidth: '100%' }}
                >
                  <Link to={`/portfolio?cat=${album.category}`} style={{ display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden', borderRadius: '1rem', aspectRatio: '3/4' }}>
                    <style>{`
                      .album-card-${album.id} { transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); width: 100%; height: 100%; object-fit: cover; }
                      .album-link-${album.id}:hover .album-card-${album.id} { transform: scale(1.05); }
                      .album-overlay-${album.id} { background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%); opacity: 0.8; transition: opacity 0.4s ease; }
                      .album-link-${album.id}:hover .album-overlay-${album.id} { opacity: 1; }
                    `}</style>

                    <div className={`album-link-${album.id}`} style={{ width: '100%', height: '100%', position: 'relative' }}>
                      {album.coverImage ? (
                        <img src={getImageUrl(album.coverImage)} alt={album.title} className={`album-card-${album.id}`} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Camera size={40} color="rgba(0,0,0,0.1)" />
                        </div>
                      )}

                      <div className={`album-overlay-${album.id}`} style={{ position: 'absolute', inset: 0 }} />

                      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                        <span style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.1)', color: '#000000', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                          {album.category.replace('_', ' ')}
                        </span>
                      </div>

                      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                        <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontFamily: 'var(--font-heading, serif)', marginBottom: '0.5rem', fontWeight: 400 }}>{album.title}</h3>
                        <p style={{ color: 'var(--gold-300, #d4a557)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                          {album._count?.images || 0} Captures
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section style={{ padding: '3rem 5% 4rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212,165,87,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'var(--gold-300, #d4a557)', marginBottom: '1rem' }}>Praise</div>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '4rem' }}>Words of Love</h2>

          <div style={{ display: 'flex', gap: '2rem', overflow: 'hidden', padding: '1rem', margin: '0 -1rem' }}>
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t, i) => (
                <motion.div 
                  key={t.uniqueId} 
                  layout
                  initial={{ opacity: 0, x: 100, scale: 0.9 }} 
                  animate={{ opacity: 1, x: 0, scale: 1 }} 
                  exit={{ opacity: 0, x: -100, scale: 0.9 }} 
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ flex: '1 1 calc(33.333% - 1.333rem)', minWidth: '300px', maxWidth: '100%', textAlign: 'left', padding: '3rem', background: 'var(--color-surface)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '1rem' }}
                >
                  <div style={{ color: 'var(--gold-300, #d4a557)', fontSize: '3rem', fontFamily: 'serif', lineHeight: 0.5, marginBottom: '1.5rem' }}>"</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '2rem' }}>{t.content}</p>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.3rem' }}>{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section style={{ padding: '4rem 5% 10rem 5%', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'linear-gradient(to bottom, var(--color-surface), var(--color-bg))' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            Let's create your <br /> <span style={{ fontStyle: 'italic', color: 'var(--gold-300, #d4a557)' }}>Legacy</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
            Book a private consultation to discuss your vision, aesthetic, and how we can bring it to life.
          </p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--text-primary)', color: 'var(--color-bg)',
            padding: '1.2rem 3rem', borderRadius: '3rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Inquire Now <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;