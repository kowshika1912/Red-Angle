import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Pause, SkipBack, SkipForward, Copy } from 'lucide-react';
import heroImage from '../assets/videoframe_wed.png';
import thumb1 from '../assets/Tamil Wedding in London.jpg';
import thumb2 from '../assets/Engagement.jpg';
import thumb3 from '../assets/download (3).jpg';
import insta1 from '../assets/download (2).jpg';
import insta2 from '../assets/download (4).jpg';
import insta3 from '../assets/hand.jpg';
import insta4 from '../assets/Best Wedding Poses.jpg';
import weddingVideo from '../assets/wedding_video.mp4';

const instagramPosts = [
  { id: 1, type: 'video', image: thumb2 },
  { id: 2, type: 'carousel', image: insta1 },
  { id: 3, type: 'carousel', image: thumb1 },
  { id: 4, type: 'carousel', image: insta2 },
  { id: 5, type: 'carousel', image: thumb3 },
  { id: 6, type: 'carousel', image: insta3 },
  { id: 7, type: 'carousel', image: heroImage },
  { id: 8, type: 'photo', image: insta4 },
];

const filmsData = [
  { 
    id: 1, 
    title: "A WEDDING OF EMOTIONS", 
    thumbnail: thumb1,
    description: "Experience the Emotional Rollercoaster, Heartfelt Vows, Tears of Joy, Laughter & Love. A Must-See Wedding film from the team of Red-Angle Studios."
  },
  { 
    id: 2, 
    title: "CLASSY CHRISTIAN WEDDING", 
    thumbnail: thumb2,
    description: "A beautiful tale of two souls uniting under the grace of god. Filled with elegant whites, heartfelt songs, and pure devotion."
  },
  { 
    id: 3, 
    title: "VIBRANT BEACH WEDDING", 
    thumbnail: thumb3,
    description: "Sun, sand, and vows. Dive into the colourful and vibrant moments of this tropical destination wedding film."
  },
  { 
    id: 4, 
    title: "THE GRAND INDIAN STORY", 
    thumbnail: heroImage,
    description: "A multi-day celebration spanning traditions, dances, and majestic rituals. Relive the grandeur of this incredible wedding."
  },
];

const Films = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="page-enter" style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Hero Video Player */}
      <section style={{ width: '100%', position: 'relative' }}>
        <div style={{ 
          width: '100%', 
          height: '75vh', 
          background: '#1f1f1f', 
          position: 'relative', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Video Element */}
          <video 
            key={weddingVideo}
            autoPlay 
            loop 
            muted 
            playsInline
            src={weddingVideo}
            style={{ 
              position: 'relative', 
              zIndex: 1, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: 0.9,
              pointerEvents: 'none' /* prevents accidental PiP or controls */
            }}
          />
        </div>
      </section>

      {/* Text Section */}
      <section style={{ padding: '6rem 2rem 5rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            fontFamily: 'var(--font-heading, serif)', 
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
            letterSpacing: '0.3em', 
            color: 'var(--text-primary)', 
            marginBottom: '2rem',
            textTransform: 'uppercase',
            fontWeight: 400
          }}
        >
          We Love Story Telling
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ 
            color: '#888', 
            fontSize: '0.95rem', 
            lineHeight: 1.8,
            fontWeight: 300
          }}
        >
          A wedding film is more than just a visual story—it's a heartfelt journey that captures the essence of love, emotion, and memories that last a lifetime. At Red-Angle Studios, we bring your story to life with soulful, earthy films that speak to the heart, filled with lively moments and perfectly timed sounds that echo your love.
        </motion.p>
      </section>

      {/* Films Carousel */}
      <section style={{ position: 'relative', padding: '0 2rem 1rem', maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Carousel Arrows */}
        <button 
          onClick={() => scroll('left')}
          style={{
            position: 'absolute', left: '3rem', top: '40%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <ChevronLeft size={24} color="#666" />
        </button>

        <button 
          onClick={() => scroll('right')}
          style={{
            position: 'absolute', right: '3rem', top: '40%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <ChevronRight size={24} color="#666" />
        </button>

        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', 
            gap: '2rem', 
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '1rem',
          }}
          className="hide-scrollbar"
        >
          {filmsData.map((film, index) => (
            <motion.div 
              key={film.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                flex: '0 0 calc(33.333% - 1.33rem)', 
                minWidth: '300px',
                scrollSnapAlign: 'start',
                cursor: 'pointer' 
              }}
              className="film-card"
            >
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: '3/4', 
                overflow: 'hidden',
                backgroundColor: '#000',
                borderRadius: '4px'
              }}>
                <img 
                  src={film.thumbnail} 
                  alt={film.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    opacity: 0.9,
                    transition: 'transform 0.5s ease, opacity 0.5s ease'
                  }} 
                  className="film-thumbnail"
                />
                
                {/* Play button overlaid at bottom center */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '2rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.4)',
                    transition: 'transform 0.3s ease, background 0.3s ease',
                  }} className="play-btn">
                    <Play size={20} fill="white" color="white" style={{ marginLeft: '4px' }} />
                  </div>
                </div>
              </div>
              <div style={{ padding: '1.5rem 0' }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading, serif)', 
                  fontSize: '1.1rem', 
                  color: 'var(--text-primary)',
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}>
                  {film.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  margin: 0
                }}>
                  {film.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section style={{ background: '#ffffff', padding: '6rem 2rem 8rem', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.4rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#111111', fontWeight: 400, marginBottom: '0.5rem' }}>
          Follow Us On Instagram
        </h3>
        <p style={{ fontFamily: 'var(--font-heading, serif)', fontStyle: 'italic', color: 'rgba(0,0,0,0.5)', fontSize: '1.1rem', marginBottom: '4rem' }}>
          @ RedAngle_Photography
        </p>

        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {instagramPosts.map((post) => (
            <div key={post.id} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', cursor: 'pointer' }}>
              <img 
                src={post.image} 
                alt="Instagram post" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              
              {post.type === 'video' && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', opacity: 0.9 }}>
                  <Play fill="white" size={48} />
                </div>
              )}
              
              {post.type === 'carousel' && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white', opacity: 0.9 }}>
                  <Copy size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem' }}>
          <a href="https://www.instagram.com/redanglestudio?igsh=YjcwbXlsNnd0MWE3" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 3rem', borderRadius: '3rem', fontSize: '0.85rem', background: 'transparent', border: '1px solid #111111', color: '#111111', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#ffffff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111111'; }}>
            View More on Instagram
          </a>
        </div>
      </section>
      
      <style>{`
        .film-card:hover .film-thumbnail {
          transform: scale(1.05);
          opacity: 1 !important;
        }
        .film-card:hover .play-btn {
          transform: scale(1.1);
          background: rgba(255,255,255,0.4) !important;
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .insta-card:hover .insta-img {
          transform: scale(1.05);
        }
        .insta-card:hover .insta-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Films;
