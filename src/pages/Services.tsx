import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Film, Star, Users, Heart, Briefcase, Baby, Shirt, X } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import Footer from '../components/layout/Footer';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';
import img5 from '../assets/Manifesting Marriage Official_ Instagram, Facebook _ Linktree.jpg';
import img6 from '../assets/South Indian Bridal Look ✨️.jpg';
import img7 from '../assets/Tamil Wedding in London.jpg';
import img8 from '../assets/videoframe_wed.png';

const customEasing: [number, number, number, number] = [0.6, 0.01, -0.05, 0.95];

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

const services = [
  {
    icon: <Camera size={28} />,
    title: 'Wedding Photography',
    subtitle: 'Timeless Wedding Memories',
    description: 'Your wedding day is one of life\'s most precious moments. Our wedding photography team captures every emotion, detail, and celebration with artistry and care. From the nervous excitement before the ceremony to the joyful celebration at the reception, we ensure every moment is beautifully preserved.',
    features: ['Full day coverage available', 'Multiple photographers', 'Pre-wedding consultation', 'Online delivery gallery', 'Premium album design', 'Drone photography available'],
    category: 'WEDDING',
    image: img7,
  },
  {
    icon: <Heart size={28} />,
    title: 'Pre-Wedding Shoots',
    subtitle: 'Celebrate Your Love Story',
    description: 'A pre-wedding shoot is the perfect opportunity to capture your love story in beautiful locations before the big day. It also helps you get comfortable in front of the camera and build rapport with your photographers.',
    features: ['Multiple location options', 'Outfit change support', 'Cinematic editing', '100+ edited photos', 'Same-week delivery', 'Print packages available'],
    category: 'PRE_WEDDING',
    image: img5,
  },
  {
    icon: <Star size={28} />,
    title: 'Candid Photography',
    subtitle: 'Authentic Moments Captured',
    description: 'Candid photography captures the real, unposed moments that make your memories truly special. Our photographers blend into the background to document the genuine emotions and interactions of your event.',
    features: ['Non-intrusive approach', 'Natural light expertise', 'Event storytelling', 'Quick turnaround', 'High resolution images', 'RAW files optional'],
    category: 'CANDID',
    image: img6,
  },
  {
    icon: <Baby size={28} />,
    title: 'Maternity Photography',
    subtitle: 'Celebrating New Life',
    description: 'Pregnancy is a beautiful journey deserving of beautiful photographs. Our maternity sessions are designed to make you feel comfortable, confident, and radiant as we capture this incredible chapter of your life.',
    features: ['Indoor & outdoor sessions', 'Professional styling advice', 'Props included', 'Partner & family welcome', '100+ edited images', 'Signature print collection'],
    category: 'MATERNITY',
    image: img3,
  },
  {
    icon: <Users size={28} />,
    title: 'Kids Photography',
    subtitle: 'Little Moments, Big Memories',
    description: 'Children grow up so fast! Our kid-friendly photographers know how to engage with children to capture their genuine smiles, laughter, and personality. Every session is a fun adventure.',
    features: ['Child-friendly environment', 'Props & backgrounds provided', 'Patient & playful approach', 'Sibling sessions welcome', 'Birthday & milestone themes', 'Canvas prints available'],
    category: 'KIDS',
    image: img1,
  },
  {
    icon: <Shirt size={28} />,
    title: 'Fashion Photography',
    subtitle: 'Style Meets Artistry',
    description: 'Our fashion photography combines technical excellence with creative vision to produce stunning images for portfolios, brands, and editorial use. We work with models, designers, and brands to bring their vision to life.',
    features: ['Portfolio shoots', 'Brand collaborations', 'Editorial photography', 'Lookbook creation', 'Styling assistance', 'Commercial licensing'],
    category: 'FASHION',
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Corporate Events',
    subtitle: 'Professional Business Coverage',
    description: 'Professional event photography for conferences, seminars, award ceremonies, and corporate gatherings. We deliver polished, publication-ready images that represent your brand perfectly.',
    features: ['Conference coverage', 'Corporate portraits', 'Award ceremonies', 'Team building events', 'Product launches', 'Same day delivery available'],
    category: 'CORPORATE',
    image: img2,
  },
  {
    icon: <Film size={28} />,
    title: 'Commercial Shoots',
    subtitle: 'Products That Sell',
    description: 'High-quality commercial photography for products, advertisements, and brand campaigns. We work with creative directors and brands to deliver images that communicate your brand message effectively.',
    features: ['Product photography', 'Advertising campaigns', 'Social media content', 'E-commerce images', 'Studio & location shoots', 'Retouching included'],
    category: 'COMMERCIAL',
    image: img8,
  },
];

const folderColors = [
  '#1e293b', // slate
  '#b45309', // amber/gold
  '#4c1d95', // deep purple
  '#065f46', // emerald
  '#991b1b', // crimson
  '#0f766e', // teal
  '#3730a3', // indigo
  '#3f3f46', // zinc
];

const Modal = ({ service, onClose, color }: any) => {
  // Lock scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: customEasing }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '1200px', height: '85vh', background: 'var(--color-bg)', borderRadius: '1rem', overflow: 'hidden', display: 'flex', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
          <X size={24} />
        </button>

        {/* Color Strip Indicator */}
        <div style={{ width: '15px', height: '100%', background: color }} />

        {/* Image */}
        <div style={{ flex: 1, position: 'relative' }}>
          <img src={service.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={service.title} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
        </div>

        {/* Details */}
        <div style={{ flex: 1, padding: '4rem 4rem 4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--color-bg)', overflowY: 'auto' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-heading, serif)', marginBottom: '1rem', lineHeight: 1.1 }}>
              {service.subtitle}
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              {service.description}
            </p>
            <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: color, fontWeight: 600 }}>What's Included</div>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {service.features.map((f: string, i: number) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: color, fontSize: '0.8rem' }}>✦</span> {f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '3.5rem', display: 'flex', gap: '1rem' }}>
              <Link to={`/gallery?cat=${service.category}`} style={{ display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '3rem', fontSize: '0.85rem', background: 'var(--text-primary)', color: 'var(--color-bg)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                View Gallery
              </Link>
              <Link to={`/packages`} style={{ display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '3rem', fontSize: '0.85rem', border: '1px solid var(--text-primary)', color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Packages
              </Link>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const FannedFolders = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const spreadAngle = 100; // Total fan angle spread
  const startAngle = -spreadAngle / 2;
  const stepAngle = spreadAngle / (services.length - 1);

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', display: 'flex', justifyContent: 'center', marginTop: '2rem', perspective: '1000px', overflow: 'hidden' }}>
      
      {/* Background shadow base for the folders */}
      <div style={{ position: 'absolute', bottom: '30px', width: '300px', height: '20px', background: 'rgba(0,0,0,0.1)', filter: 'blur(20px)', borderRadius: '50%' }} />

      {services.map((service, idx) => {
        const baseRotate = startAngle + idx * stepAngle;
        const isHovered = hoveredIndex === idx;

        return (
          <motion.div
            key={idx}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(idx)}
            initial={false}
            animate={{
              rotateZ: baseRotate,
              y: isHovered ? -40 : 0,
              scale: isHovered ? 1.05 : 1,
              zIndex: isHovered ? 50 : idx,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              bottom: '50px', // Lifted slightly off bottom
              width: '180px',
              height: '480px',
              transformOrigin: 'bottom center',
              background: folderColors[idx],
              borderRadius: '8px 8px 4px 4px',
              // Realistic folder spine shading
              boxShadow: '-10px 0 20px rgba(0,0,0,0.3), inset -4px 0 10px rgba(0,0,0,0.3), inset 2px 0 5px rgba(255,255,255,0.2), 0 10px 20px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem',
            }}
          >
             {/* Folder Label on Spine */}
             <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.95)', width: '85%', padding: '1.5rem 0.5rem', borderRadius: '4px', textAlign: 'center', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.2)' }}>
                <span style={{ color: folderColors[idx], opacity: 0.8 }}>{service.icon}</span>
                <div style={{ color: '#1a1a1a', fontSize: '1rem', fontWeight: 700, marginTop: '1rem', fontFamily: 'var(--font-heading, serif)', lineHeight: 1.2 }}>
                  {service.title}
                </div>
             </div>
             
             {/* Binder Ring Hole */}
             <div style={{ position: 'absolute', bottom: '2.5rem', width: '30px', height: '30px', borderRadius: '50%', background: '#e0e0e0', border: '4px solid #fff', boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.2)' }} />
          </motion.div>
        )
      })}
      
      {/* Full screen modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Modal service={services[selectedIndex]} onClose={() => setSelectedIndex(null)} color={folderColors[selectedIndex]} />
        )}
      </AnimatePresence>
    </div>
  )
}

const Services = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500); // Small delay to let ScrollStack calculate sizes
    }
  }, []);

  return (
    <div className="page-enter" style={{ background: 'var(--color-bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ==================== HERO ==================== */}
      <section className="page-hero" style={{ padding: '8rem 0 2rem', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'center' }}
          >
            <motion.div variants={itemVariants} className="section-tag" style={{ justifyContent: 'center', color: 'var(--gold-300)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              — WHAT WE OFFER —
            </motion.div>
            
            <div style={{ overflow: 'hidden', paddingBottom: '0.5rem' }}>
              <motion.h1 variants={textRevealVariants} className="section-title" style={{ margin: 0, textAlign: 'center', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '400', fontFamily: 'var(--font-heading, serif)', color: 'var(--text-primary)' }}>
                Our <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Services</span>
              </motion.h1>
            </div>
            
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '1.5rem auto 0', textAlign: 'center', lineHeight: '1.8', fontSize: '1.125rem' }}>
              Select a collection below to open and explore the details of our professional photography and videography services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ==================== SCROLL STACK SERVICES ==================== */}
      <section style={{ width: '100%', background: 'var(--color-bg)' }}>
        <ScrollStack
          itemDistance={150}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="5%"
          scaleEndPosition="0%"
          baseScale={0.85}
          rotationAmount={0}
          blurAmount={0.5}
          useWindowScroll={true}
        >
          {services.map((service, idx) => (
            <ScrollStackItem key={idx}>
              <div 
                id={service.category.toLowerCase()}
                className="service-card"
                style={{ '--card-color': folderColors[idx] } as React.CSSProperties}
              >
                {/* Image Side */}
                <div className="service-image-col">
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg, ${folderColors[idx]}cc 0%, transparent 60%)`,
                  }} />
                  <div style={{
                    position: 'absolute', top: '1.5rem', left: '1.5rem',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    color: '#fff',
                  }}>
                    {service.icon}
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                    background: folderColors[idx],
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '99px',
                  }}>
                    {service.category.replace('_', ' ')}
                  </div>
                </div>

                {/* Content Side */}
                <div className="service-content-col">
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: folderColors[idx], marginBottom: '0.5rem' }}>
                    {service.subtitle}
                  </p>
                  <h3 style={{
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontFamily: 'var(--font-heading, serif)',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                  }}>
                    {service.title}
                  </h3>
                  <p className="service-description" style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {service.description}
                  </p>
                  <div className="service-features" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                    {service.features.slice(0, 4).map((f: string, i: number) => (
                      <span key={i} style={{
                        fontSize: '0.78rem',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '99px',
                        background: `${folderColors[idx]}18`,
                        color: folderColors[idx],
                        fontWeight: 600,
                      }}>
                        ✦ {f}
                      </span>
                    ))}
                  </div>
                  <div className="service-actions" style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link
                      to={`/gallery?cat=${service.category}`}
                      style={{
                        display: 'inline-flex',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '99px',
                        fontSize: '0.8rem',
                        background: folderColors[idx],
                        color: '#fff',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                      }}
                    >
                      View Gallery
                    </Link>
                    <Link
                      to="/packages"
                      style={{
                        display: 'inline-flex',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '99px',
                        fontSize: '0.8rem',
                        border: `1px solid ${folderColors[idx]}`,
                        color: folderColors[idx],
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                      }}
                    >
                      Packages
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* ==================== CTA ==================== */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--color-surface)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Ready to Book?</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 3rem', maxWidth: '500px', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Contact us to discuss your vision, aesthetic, and how we can bring it to life through our premium lens.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" style={{ display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '3rem', fontSize: '0.85rem', background: 'var(--text-primary)', color: 'var(--color-bg)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                Get in Touch
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/packages" style={{ display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '3rem', fontSize: '0.85rem', border: '1px solid var(--text-primary)', color: 'var(--text-primary)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                View Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .service-card {
          display: flex;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .service-image-col {
          position: relative;
          width: 40%;
          flex-shrink: 0;
        }
        .service-content-col {
          flex: 1;
          padding: 2.5rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fff;
          border-left: 4px solid var(--card-color);
        }
        .service-description {
          -webkit-line-clamp: 3;
        }
        
        @media (max-width: 768px) {
          .service-card {
            flex-direction: column;
          }
          .service-image-col {
            width: 100%;
            height: 35%;
          }
          .service-content-col {
            border-left: none;
            border-top: 4px solid var(--card-color);
            padding: 1.5rem;
            justify-content: flex-start;
          }
          .service-description {
            -webkit-line-clamp: 4;
            font-size: 0.85rem !important;
            margin-bottom: 1rem !important;
          }
          .service-features {
            margin-bottom: 1rem !important;
          }
          .service-features span {
            font-size: 0.7rem !important;
            padding: 0.2rem 0.6rem !important;
          }
          .service-actions {
            flex-direction: row;
            gap: 0.5rem !important;
          }
          .service-actions > a {
            flex: 1;
            padding: 0.6rem 0.5rem !important;
            font-size: 0.75rem !important;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
