import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Camera, Heart, Users, ArrowRight, Star, Sparkles } from 'lucide-react';

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

// Premium fluid easing curves
const customEasing: [number, number, number, number] = [0.6, 0.01, -0.05, 0.95];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: customEasing }
  }
};

// Team Card Animation Variants
const cardOverlayVariants: Variants = {
  rest: { opacity: 0, y: 30 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: customEasing } }
};

const cardContentVariants: Variants = {
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 0, y: -20, transition: { duration: 0.4, ease: customEasing } }
};

const About = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Overall page scroll with smooth spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const heroY = useTransform(smoothY, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 0.3], [1, 0.95]);

  // Timeline specific scroll
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const smoothTimelineScroll = useSpring(timelineScroll, { stiffness: 70, damping: 25 });

  return (
    <div className="page-enter" ref={containerRef} style={{ background: '#ffffff', color: '#111111', overflow: 'hidden', position: 'relative' }}>

      {/* Cinematic Animated Ambient Background - Adapted for Light Theme */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 0%, rgba(212,165,87,0.12) 0%, transparent 60%)'
      }} />

      {/* Floating Light Dust Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, i % 2 === 0 ? 30 : -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            backgroundColor: '#d4a557',
            filter: 'blur(1px)',
            zIndex: 0
          }}
        />
      ))}

      {/* Cinematic Hero */}
      <section style={{ position: 'relative', paddingTop: '15rem', paddingBottom: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, minHeight: '90vh' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale, textAlign: 'center', width: '100%', padding: '0 2rem' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
                The Red-Angle Story
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
                Capturing
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
                  // Updated to an elegant italic serif to match the image provided
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Bodoni MT', 'Didot', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  paddingRight: '0.5rem',
                  color: '#d4a557',
                  WebkitTextFillColor: '#d4a557'
                }}>The</span> Ethereal.
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, #d4a557, transparent)' }} />
        </motion.div>
      </section>

      {/* Avant-Garde Mission Section */}
      <section style={{ position: 'relative', zIndex: 2, padding: '8rem 2rem', background: 'rgba(250, 250, 250, 0.6)', backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>

          {/* Left Column: Parallax Floating Graphic */}
          <motion.div
            style={{ gridColumn: '1 / 6', position: 'relative' }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: customEasing }}
          >
            <motion.div
              animate={{ y: [-15, 15, -15], rotateZ: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              style={{
                aspectRatio: '3/4',
                borderRadius: '2rem 0 2rem 0',
                background: 'linear-gradient(135deg, rgba(212,165,87,0.1), rgba(0,0,0,0.02))',
                border: '1px solid rgba(212,165,87,0.2)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Spinning Glow */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, transparent 0 280deg, rgba(212,165,87,0.2) 360deg)', borderRadius: '50%' }}
              />
              <div style={{ position: 'absolute', inset: '2px', background: '#ffffff', borderRadius: '2rem 0 2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Camera size={72} color="#d4a557" strokeWidth={1} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Text */}
          <motion.div
            style={{ gridColumn: '7 / 13' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} style={{
              fontFamily: 'var(--font-heading, serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              marginBottom: '2rem',
              color: '#111111'
            }}>
              More than images.<br />
              <span style={{
                color: '#d4a557',
                fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Bodoni MT', 'Didot', serif",
                fontStyle: 'italic',
                fontWeight: 400
              }}>We craft legacies.</span>
            </motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '600px', fontWeight: 400 }}>
              Since 2013, Red-Angle Studio has evolved into a sanctuary for visual storytelling. We don't just document; we distill the raw, ephemeral emotions of your most significant moments into timeless art.
            </motion.p>

            {/* Premium Light Stats Grid */}
            <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {[
                { icon: <Award size={28} />, label: '10+ Years', sub: 'Of Mastery' },
                { icon: <Heart size={28} />, label: '500+', sub: 'Weddings' },
                { icon: <Star size={28} />, label: '15 Awards', sub: 'Excellence' },
                { icon: <Users size={28} />, label: '2000+', sub: 'Clients' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02, backgroundColor: 'rgba(212,165,87,0.05)', borderColor: 'rgba(212,165,87,0.3)' }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    padding: '2rem 1.5rem',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    cursor: 'default',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ color: '#d4a557', padding: '0.8rem', background: 'rgba(212,165,87,0.1)', borderRadius: '50%' }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#111111' }}>{stat.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.2rem', fontWeight: 500 }}>{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Timeline */}
      <section ref={timelineRef} style={{ position: 'relative', zIndex: 2, padding: '10rem 2rem 8rem', background: '#ffffff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 0 }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: customEasing }}
              style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '4rem', marginBottom: '3rem', color: '#111111' }}
            >
              The Evolution
            </motion.h2>

            <motion.div
              animate={{ boxShadow: ['0 0 0px rgba(212,165,87,0)', '0 0 30px rgba(212,165,87,0.2)', '0 0 0px rgba(212,165,87,0)'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{
                display: 'inline-flex',
                padding: '1.2rem',
                background: 'linear-gradient(135deg, rgba(212,165,87,0.1) 0%, rgba(212,165,87,0.02) 100%)',
                borderRadius: '50%',
                border: '1px solid rgba(212,165,87,0.3)',
                position: 'relative',
                zIndex: 3,
              }}
            >
              <Camera size={36} color="#d4a557" strokeWidth={1.5} />
            </motion.div>

            {/* Bridge Line */}
            <div style={{ width: '2px', height: '6rem', background: 'linear-gradient(to bottom, #d4a557, rgba(0,0,0,0.05))', margin: '0 auto', position: 'relative', zIndex: 2 }} />
          </div>

          <div style={{ position: 'relative' }}>
            {/* Scroll-Drawn Center Timeline Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', background: 'rgba(0,0,0,0.05)', transform: 'translateX(-50%)', zIndex: 1 }} />

            {/* Animated Gold Fill */}
            <motion.div
              style={{
                position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px',
                background: 'linear-gradient(180deg, #d4a557 0%, #d4a557 80%, transparent 100%)',
                transformOrigin: 'top',
                scaleY: smoothTimelineScroll,
                x: '-50%',
                zIndex: 2,
              }}
            />

            {timelineEvents.map((event, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: 0.1, ease: customEasing }}
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    marginBottom: i === timelineEvents.length - 1 ? 0 : '10rem',
                    gap: '4rem',
                    position: 'relative'
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{ flex: 1, textAlign: isEven ? 'right' : 'left', background: 'rgba(0,0,0,0.01)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.04)' }}
                  >
                    <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading, serif)', color: '#d4a557', marginBottom: '1rem' }}>{event.title}</h3>
                    <p style={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.7, fontSize: '1.1rem', fontWeight: 400 }}>{event.desc}</p>
                  </motion.div>

                  {/* Glowing Pulse Node */}
                  <div style={{ position: 'relative', zIndex: 3 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ffffff', border: '2px solid #d4a557', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: i * 0.3 }}
                        style={{ width: 10, height: 10, borderRadius: '50%', background: '#d4a557' }}
                      />
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
                    <motion.span
                      whileHover={{ color: 'rgba(212,165,87,0.15)', scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ fontSize: '7rem', fontWeight: 900, color: 'rgba(0,0,0,0.03)', letterSpacing: '-0.05em', cursor: 'default' }}>
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
      <section style={{ padding: '6rem 2rem 8rem', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEasing }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem', flexWrap: 'wrap', gap: '2rem' }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', margin: 0, color: '#111111' }}>The Artisans</h2>
            <p style={{ color: 'rgba(0,0,0,0.6)', maxWidth: 300, textAlign: 'right', fontSize: '1.1rem', fontWeight: 500 }}>Masters of light, shadow, and visual narrative.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: customEasing }}
                whileHover="hover"
                animate="rest"
                style={{
                  position: 'relative',
                  height: '420px',
                  background: '#ffffff',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px -15px rgba(0,0,0,0.05)'
                }}
              >
                {/* Framer Motion Pure Hover Effects */}
                <motion.div
                  variants={{ hover: { borderColor: 'rgba(212,165,87,0.8)', boxShadow: '0 20px 40px rgba(212,165,87,0.15)' } }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '1.5rem', border: '1px solid transparent', zIndex: 1, transition: 'all 0.4s' }}
                />

                <div style={{ padding: '3rem 2.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                  <motion.div variants={cardContentVariants}>
                    <div style={{ color: '#d4a557', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: 700 }}>
                      {member.role}
                    </div>
                    <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading, serif)', margin: 0, color: '#111111' }}>{member.name}</h3>
                  </motion.div>

                  {/* Bright Gold Overlay on Hover */}
                  <motion.div variants={cardOverlayVariants} style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(212,165,87,0.98), rgba(212,165,87,0.9))',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    padding: '2.5rem', textAlign: 'center'
                  }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1.3rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 500 }}>"{member.quote}"</p>
                    <div style={{ width: '40px', height: '2px', background: '#ffffff', marginBottom: '1.5rem' }} />
                    <p style={{ fontSize: '0.85rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>{member.specialty}</p>
                  </motion.div>

                  <div style={{ alignSelf: 'flex-end', opacity: 0.04, fontSize: '8rem', fontFamily: 'var(--font-heading, serif)', lineHeight: 0.8, pointerEvents: 'none', color: '#111111' }}>
                    {member.name.charAt(0)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', background: '#ffffff', overflow: 'hidden' }}>

        {/* Animated Gradient Sweep */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, #d4a557, transparent)',
            opacity: 0.8
          }}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: customEasing }}>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', color: '#111111' }}>
            Ready to frame your story?
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.25rem', marginBottom: '4rem', maxWidth: 600, margin: '0 auto 4rem', fontWeight: 400 }}>
            Let us curate your memories with the precision and artistry they deserve.
          </p>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                background: '#d4a557', color: '#ffffff',
                padding: '1.2rem 3rem', borderRadius: '3rem',
                fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em',
                boxShadow: '0 15px 35px -10px rgba(212,165,87,0.6)',
                position: 'relative', overflow: 'hidden'
              }}>
                Book a Consultation <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.03)' }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <Link to="/portfolio" style={{
                display: 'inline-flex', alignItems: 'center',
                color: '#111111', textDecoration: 'none',
                padding: '1.2rem 3rem', borderRadius: '3rem',
                border: '1px solid rgba(0,0,0,0.2)',
                textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem',
                fontWeight: 600
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