import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import img5 from '../assets/Manifesting Marriage Official_ Instagram, Facebook _ Linktree.jpg';
import img7 from '../assets/Tamil Wedding in London.jpg';
import img3 from '../assets/download (4).jpg';
import img6 from '../assets/South Indian Bridal Look ✨️.jpg';

const customEasing: [number, number, number, number] = [0.6, 0.01, -0.05, 0.95];

const categories = [
  { id: '01', title: 'PRE WEDDING', image: img5 },
  { id: '02', title: 'POST WEDDING', image: img7 },
  { id: '03', title: 'MATERNITY', image: img3 },
  { id: '04', title: 'FASHION', image: img6 }
];

const testimonials = [
  { quote: "Little things matter, and that's what makes Red-Angle stand out. While delivering our wedding film, they ensured we were with our family watching it, with Sajith joining us via video call to capture our raw reactions. The wedding film exceeded our expectations—it not only took us back to that special day but also made us connect to it on a deeper level. A 10-minute video never made us feel so emotional! The filmography, screenplay, and editing were all executed beautifully.", author: "SAHAANA & THAMIZH" },
  { quote: "Red-Angle brought our vision to life. The attention to detail and the way they captured every fleeting emotion was truly magical. We couldn't have asked for a better team to document our special day.", author: "ANJALI & RAHUL" },
  { quote: "Beyond just taking photos, they tell a story. Every frame is a piece of art that we will cherish forever. The passion they bring to their work reflects beautifully in the final results.", author: "PRIYA & KARTHIK" }
];

const instagramPosts = [
  { id: 1, type: 'video', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop' },
  { id: 2, type: 'carousel', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop' },
  { id: 3, type: 'carousel', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop' },
  { id: 4, type: 'carousel', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop' },
  { id: 5, type: 'carousel', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop' },
  { id: 6, type: 'carousel', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop' },
  { id: 7, type: 'carousel', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop' },
  { id: 8, type: 'photo', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
];

const About = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="page-enter" style={{ overflow: 'hidden' }}>
      {/* Meet Our Founders Section */}
      <section style={{ position: 'relative', width: '100%', padding: '0', background: '#000000', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          
          {/* Left Founder Image (Sarav) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{ flex: '1', position: 'relative', minHeight: '600px', minWidth: '300px' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" 
              alt="Sarav" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }} 
            />
            {/* Fade into black */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, #000000 100%), linear-gradient(to bottom, transparent 80%, #000000 100%), linear-gradient(to top, transparent 80%, #000000 100%)' }} />
          </motion.div>

          {/* Center Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEasing }}
            style={{ flex: '1.2', textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '350px', maxWidth: '600px', margin: '0 auto', zIndex: 3 }}
          >
            <h4 style={{ color: '#E50914', fontSize: '1.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-heading, serif)' }}>
              MEET
            </h4>
            <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading, serif)', marginBottom: '3rem', fontWeight: 400 }}>
              Our Founders
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontWeight: 300, fontFamily: 'var(--font-body, sans-serif)' }}>
              As the creative visionaries behind Red-Angle Studios, we started this journey with a simple mission: to craft visual masterpieces that capture the raw, unscripted emotions of your special day. With a combined experience of over a decade in cinematic wedding photography, our team has documented hundreds of unique love stories across the globe.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.9)', fontWeight: 300, fontFamily: 'var(--font-body, sans-serif)' }}>
              We believe that every couple has a distinct narrative, and our passion is to tell that story through breathtaking imagery and artful composition. From candid smiles to the grandest celebrations, Red-Angle Studios is dedicated to turning your fleeting moments into timeless, cinematic memories that you will cherish for a lifetime.
            </p>
          </motion.div>

          {/* Right Founder Image (Sajith) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{ flex: '1', position: 'relative', minHeight: '600px', minWidth: '300px' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              alt="Sajith" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }} 
            />
            {/* Fade into black */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 50%, #000000 100%), linear-gradient(to bottom, transparent 80%, #000000 100%), linear-gradient(to top, transparent 80%, #000000 100%)' }} />
          </motion.div>

        </div>
      </section>

      {/* Vision, Mission, Achievements Section */}
      <section style={{ background: '#ffffff', color: '#333333', padding: '6rem 2rem 2rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          
          {/* Vision */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: customEasing }}>
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" alt="Vision" style={{ width: '100%', height: '350px', objectFit: 'cover', filter: 'grayscale(100%)', marginBottom: '2rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#222222', fontWeight: 400 }}>Vision</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', fontWeight: 400 }}>
              Our vision is to be a premier destination for couples seeking authentic and beautiful documentary wedding photography, to creating visually stunning and emotionally evocative films that capture the essence of love and commitment.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: customEasing }}>
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="Mission" style={{ width: '100%', height: '350px', objectFit: 'cover', filter: 'grayscale(100%)', marginBottom: '2rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#222222', fontWeight: 400 }}>Mission</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', fontWeight: 400 }}>
              To provide our clients with an unparalleled photography experience that results in beautiful and timeless images that they will treasure for a lifetime. We strive to be creative, attentive, and professional in everything we do, and to consistently deliver exceptional quality and service to our clients. We are committed to capturing the beauty, emotion, and candid moments of each family celebrations we photograph, and to creating a lasting legacy of the celebrations.
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: customEasing }}>
            <img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop" alt="Achievements" style={{ width: '100%', height: '350px', objectFit: 'cover', filter: 'grayscale(100%)', marginBottom: '2rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#222222', fontWeight: 400 }}>Achievements</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', fontWeight: 400 }}>
              South India's Brand Ambassador of FujiFilm X-series camera. Won 2 Fearless awards in Collection 50, competing with top photographers around the world. Winner of "Behind the Scene" category - Canon Wedding photographer of the year 2017-18 by Better Photography Magazine. 9 Award nominations - Most nominated Wedding photography team in Sony Better Photography Wedding photographer of the year 2019-20.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Interactive Categories Gallery */}
      <section style={{ display: 'flex', minHeight: '70vh', background: '#ffffff', width: '100%', overflow: 'hidden', flexWrap: 'wrap', padding: '2rem 2rem 4rem', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '450px', padding: '2rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {categories.map((cat, idx) => (
              <div 
                key={cat.id} 
                onMouseEnter={() => setActiveCategory(idx)}
                onClick={() => {
                  let hash = 'wedding';
                  if (cat.title === 'PRE WEDDING') hash = 'pre_wedding';
                  else if (cat.title === 'MATERNITY') hash = 'maternity';
                  else if (cat.title === 'FASHION') hash = 'fashion';
                  navigate(`/services#${hash}`);
                }}
                style={{ cursor: 'pointer', opacity: activeCategory === idx ? 1 : 0.4, transition: 'opacity 0.4s' }}
              >
                <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.8rem', letterSpacing: '0.2em', fontWeight: 500 }}>{cat.id}</div>
                <div style={{ 
                  fontFamily: 'var(--font-heading, serif)', 
                  fontSize: '2.5rem', 
                  letterSpacing: '0.2em', 
                  color: '#111111',
                  borderBottom: activeCategory === idx ? '1px solid rgba(0,0,0,0.3)' : '1px solid transparent',
                  paddingBottom: '0.5rem',
                  display: 'inline-block',
                  transition: 'border-color 0.4s',
                  lineHeight: 1.2
                }}>
                  {cat.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}<br/>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Image View */}
        <div style={{ flex: '2', minWidth: '400px', maxWidth: '1000px', height: '650px', margin: 'auto', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeCategory}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: customEasing }}
              src={categories[activeCategory].image} 
              alt={categories[activeCategory].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={{ background: '#ffffff', color: '#111111', padding: '2rem 2rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.2)', margin: '0 auto 2rem' }}></div>
        
        <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 400 }}>
          What Our Client Says
        </h2>
        <p style={{ fontFamily: 'var(--font-heading, serif)', fontStyle: 'italic', color: 'rgba(0,0,0,0.5)', fontSize: '1.2rem', marginBottom: '5rem' }}>
          At the end of the day, people won't remember what you said or did, they will remember how you made them feel.
        </p>

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={prevTestimonial} style={{ position: 'absolute', left: 0, padding: '1rem', cursor: 'pointer', opacity: 0.5 }}>
            <ArrowLeft strokeWidth={1} size={40} />
          </button>

          <div style={{ overflow: 'hidden', padding: '0 5rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: customEasing }}
              >
                <p style={{ fontFamily: 'var(--font-heading, serif)', fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 2, color: 'rgba(0,0,0,0.6)', marginBottom: '3rem' }}>
                  {testimonials[activeTestimonial].quote}
                </p>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: '#333' }}>
                  {testimonials[activeTestimonial].author}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={nextTestimonial} style={{ position: 'absolute', right: 0, padding: '1rem', cursor: 'pointer', opacity: 0.5 }}>
            <ArrowRight strokeWidth={1} size={40} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem', marginBottom: '2rem' }}>
          {testimonials.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveTestimonial(idx)}
              style={{ 
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '30px', height: '30px',
                borderRadius: '50%',
                border: activeTestimonial === idx ? '1px solid rgba(0,0,0,0.3)' : '1px solid transparent',
                transition: 'border-color 0.3s'
              }}
            >
              <div style={{ 
                width: '6px', height: '6px', 
                background: 'rgba(0,0,0,0.4)', 
                transform: 'rotate(45deg)',
                opacity: activeTestimonial === idx ? 1 : 0.5
              }}></div>
            </div>
          ))}
        </div>

      </section>

      {/* Instagram Feed Section */}
      <section style={{ background: '#ffffff', padding: '0 2rem 8rem', textAlign: 'center' }}>
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
      </section>
    </div>
  );
};

export default About;