import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Camera, Heart, Users, ArrowRight, Star } from 'lucide-react';

const timelineEvents = [
  { year: '2013', title: 'The Inception', desc: 'Started with a passion for capturing authentic moments and a single camera.' },
  { year: '2015', title: 'First Grand Canvas', desc: 'Photographed our first grand wedding, setting the standard for our signature style.' },
  { year: '2017', title: 'Studio Expansion', desc: 'Moved to our dedicated studio space and expanded our team of talented photographers.' },
  { year: '2019', title: 'Crowned Best', desc: 'Received the "Best Wedding Photographer" award from the India Photography Association.' },
  { year: '2021', title: 'Cinematic Skies', desc: 'Expanded services to include cinematic videography and drone coverage.' },
  { year: '2024', title: '500+ Masterpieces', desc: 'Celebrated a milestone of over 500 weddings captured across India.' },
];

const team = [
  { name: 'Rahul Verma', role: 'Lead & Founder', specialty: 'Wedding & Portrait', quote: "Light is my language." },
  { name: 'Priya Sharma', role: 'Senior Artist', specialty: 'Fashion & Editorial', quote: "Elegance in every frame." },
  { name: 'Arjun Patel', role: 'Cinematographer', specialty: 'Cinematography & Drone', quote: "Motion tells the truth." },
  { name: 'Meena Kapoor', role: 'Master Retoucher', specialty: 'Color Grading', quote: "Perfecting the mood." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
};

const About = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Overall page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Specific scroll for the timeline line drawing effect
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="page-enter" ref={containerRef} style={{ background: '#050505', color: '#fff', overflow: 'hidden', position: 'relative' }}>

      {/* 1. Camera Flash Intro Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        style={{ position: 'fixed', inset: 0, background: '#ffffff', zIndex: 9999, pointerEvents: 'none' }}
      />

      {/* Background Texture/Glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 0%, rgba(212,165,87,0.05) 0%, transparent 70%)'
      }} />

      {/* Cinematic Hero */}
      <section style={{ position: 'relative', paddingTop: '12rem', paddingBottom: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, minHeight: '80vh' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, textAlign: 'center', width: '100%', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            <span style={{
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              fontSize: '0.85rem',
              color: 'var(--gold-300, #d4a557)',
              marginBottom: '2rem'
            }}>
              The Red-Angle Story
            </span>
            <h1 style={{
              fontFamily: 'var(--font-heading, serif)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 1.1,
              margin: 0,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #A0A0A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Capturing <br /> The Ethereal.
            </h1>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', color: '#666' }}
        >
          <ArrowRight size={28} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </section>

      {/* Avant-Garde Mission Section */}
      <section style={{ position: 'relative', zIndex: 2, padding: '6rem 2rem', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>

          {/* Left Column: Parallax Floating Graphic */}
          <motion.div
            style={{ gridColumn: '1 / 6', position: 'relative' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{
                aspectRatio: '3/4',
                borderRadius: '2rem 0 2rem 0',
                background: 'linear-gradient(45deg, rgba(212,165,87,0.1), rgba(255,255,255,0.02))',
                border: '1px solid rgba(212,165,87,0.2)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'conic-gradient(from 0deg, transparent 0 340deg, rgba(212,165,87,0.4) 360deg)', borderRadius: '50%' }}
              />
              <div style={{ position: 'absolute', inset: 2, background: '#0a0a0a', borderRadius: '2rem 0 2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={64} color="var(--gold-300, #d4a557)" strokeWidth={1} />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Text */}
          <motion.div
            style={{ gridColumn: '7 / 13' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} style={{
              fontFamily: 'var(--font-heading, serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.2,
              marginBottom: '2rem'
            }}>
              More than images.<br />
              <span style={{ color: 'var(--gold-300, #d4a557)', fontStyle: 'italic' }}>We craft legacies.</span>
            </motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: '#a0a0a0', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '600px' }}>
              Since 2013, Red-Angle Studio has evolved into a sanctuary for visual storytelling. We don't just document; we distill the raw, ephemeral emotions of your most significant moments into timeless art.
            </motion.p>

            {/* Glassmorphic Stats Grid */}
            <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                { icon: <Award size={24} />, label: '10+ Years', sub: 'Of Mastery' },
                { icon: <Heart size={24} />, label: '500+', sub: 'Weddings' },
                { icon: <Star size={24} />, label: '15 Awards', sub: 'Excellence' },
                { icon: <Users size={24} />, label: '2000+', sub: 'Clients' },
              ].map((stat, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,165,87,0.1)' }} style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  cursor: 'default'
                }}>
                  <div style={{ color: 'var(--gold-300, #d4a557)' }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{stat.label}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Timeline */}
      <section ref={timelineRef} style={{ position: 'relative', zIndex: 2, padding: '10rem 2rem 4rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '3rem', marginBottom: '3rem' }}>The Evolution</h2>

            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                display: 'inline-flex',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(212,165,87,0.2) 0%, rgba(212,165,87,0.05) 100%)',
                borderRadius: '50%',
                border: '1px solid rgba(212,165,87,0.4)',
                boxShadow: '0 10px 25px -10px rgba(212,165,87,0.5)',
                position: 'relative',
                zIndex: 3
              }}
            >
              <Camera size={32} color="var(--gold-300, #d4a557)" strokeWidth={1.5} />
            </motion.div>

            {/* Connecting line bridging the gap to the first timeline item */}
            <div style={{ width: '2px', height: '6rem', background: 'linear-gradient(to bottom, var(--gold-300, #d4a557), rgba(255,255,255,0.05))', margin: '0 auto', position: 'relative', zIndex: 2 }} />
          </div>

          <div style={{ position: 'relative' }}>

            {/* 2. Scroll-Drawn Center Timeline Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)', zIndex: 1 }} />
            <motion.div
              style={{
                position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px',
                background: 'linear-gradient(180deg, var(--gold-300, #d4a557) 0%, rgba(212,165,87,0) 100%)',
                transformOrigin: 'top',
                scaleY: timelineScroll,
                x: '-50%',
                zIndex: 2
              }}
            />

            {timelineEvents.map((event, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    marginBottom: i === timelineEvents.length - 1 ? 0 : '8rem',
                    gap: '4rem'
                  }}
                >
                  <div style={{ flex: 1, textAlign: isEven ? 'right' : 'left' }}>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading, serif)', color: 'var(--gold-300, #d4a557)', marginBottom: '0.5rem' }}>{event.title}</h3>
                    <p style={{ color: '#a0a0a0', lineHeight: 1.6, fontSize: '1.1rem' }}>{event.desc}</p>
                  </div>

                  {/* 3. Glowing & Pulsing Node */}
                  <div style={{ position: 'relative', zIndex: 3 }}>
                    <motion.div
                      animate={{ boxShadow: ['0 0 0px rgba(212,165,87,0)', '0 0 25px rgba(212,165,87,0.8)', '0 0 0px rgba(212,165,87,0)'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: i * 0.2 }}
                      style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--gold-300, #d4a557)' }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <motion.span
                      whileHover={{ color: 'rgba(255,255,255,0.1)' }}
                      style={{ fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em', cursor: 'default', transition: 'color 0.3s' }}>
                      {event.year}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Team Roster */}
      <section style={{ padding: '4rem 2rem 4rem', background: '#030303' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: 0 }}>The Artisans</h2>
            <p style={{ color: '#666', maxWidth: 300, textAlign: 'right' }}>Masters of light, shadow, and narrative.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  position: 'relative',
                  height: '400px',
                  background: '#0a0a0a',
                  borderRadius: '1rem',
                  overflow: 'hidden'
                }}
                className="team-card"
              >
                <style>{`
                  .team-card:hover .overlay { opacity: 1; transform: translateY(0); }
                  .team-card:hover .initial-text { opacity: 0; transform: translateY(-20px); }
                  .team-card { transition: all 0.5s ease; border: 1px solid rgba(255,255,255,0.05); }
                  .team-card:hover { border-color: rgba(212,165,87,0.5); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
                `}</style>

                <div style={{ padding: '3rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="initial-text" style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    <div style={{ color: 'var(--gold-300, #d4a557)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                      {member.role}
                    </div>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading, serif)', margin: 0 }}>{member.name}</h3>
                  </div>

                  <div className="overlay" style={{
                    position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(212,165,87,0.95), rgba(10,10,10,0.9))',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    padding: '2rem', textAlign: 'center',
                    opacity: 0, transform: 'translateY(20px)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>"{member.quote}"</p>
                    <div style={{ width: '40px', height: '2px', background: '#fff', marginBottom: '1rem' }} />
                    <p style={{ fontSize: '0.9rem', color: '#eee', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{member.specialty}</p>
                  </div>

                  <div style={{ alignSelf: 'flex-end', opacity: 0.05, fontSize: '6rem', fontFamily: 'var(--font-heading, serif)', lineHeight: 0.8, pointerEvents: 'none' }}>
                    {member.name.charAt(0)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100vw', height: '1px', background: 'radial-gradient(circle, rgba(212,165,87,0.5) 0%, transparent 70%)'
        }} />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Ready to frame your story?
          </h2>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: 500, margin: '0 auto 3rem' }}>
            Let us curate your memories with the precision and artistry they deserve.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                background: 'var(--gold-300, #d4a557)', color: '#000',
                padding: '1.2rem 2.5rem', borderRadius: '2rem',
                fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em',
                boxShadow: '0 10px 30px -10px rgba(212,165,87,0.5)'
              }}>
                Book a Consultation <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/portfolio" style={{
                display: 'inline-flex', alignItems: 'center',
                color: '#fff', textDecoration: 'none',
                padding: '1.2rem 2.5rem', borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.2)',
                textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem',
              }}>
                Explore Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;