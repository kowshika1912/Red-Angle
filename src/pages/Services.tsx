import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Film, Star, Users, Heart, Briefcase, Baby, Shirt } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as unknown as any },
  }),
};

const services = [
  {
    icon: <Camera size={32} />,
    title: 'Wedding Photography',
    subtitle: 'Timeless Wedding Memories',
    description: 'Your wedding day is one of life\'s most precious moments. Our wedding photography team captures every emotion, detail, and celebration with artistry and care. From the nervous excitement before the ceremony to the joyful celebration at the reception, we ensure every moment is beautifully preserved.',
    features: ['Full day coverage available', 'Multiple photographers', 'Pre-wedding consultation', 'Online delivery gallery', 'Premium album design', 'Drone photography available'],
    category: 'WEDDING',
  },
  {
    icon: <Heart size={32} />,
    title: 'Pre-Wedding Shoots',
    subtitle: 'Celebrate Your Love Story',
    description: 'A pre-wedding shoot is the perfect opportunity to capture your love story in beautiful locations before the big day. It also helps you get comfortable in front of the camera and build rapport with your photographers.',
    features: ['Multiple location options', 'Outfit change support', 'Cinematic editing', '100+ edited photos', 'Same-week delivery', 'Print packages available'],
    category: 'PRE_WEDDING',
  },
  {
    icon: <Star size={32} />,
    title: 'Candid Photography',
    subtitle: 'Authentic Moments Captured',
    description: 'Candid photography captures the real, unposed moments that make your memories truly special. Our photographers blend into the background to document the genuine emotions and interactions of your event.',
    features: ['Non-intrusive approach', 'Natural light expertise', 'Event storytelling', 'Quick turnaround', 'High resolution images', 'RAW files optional'],
    category: 'CANDID',
  },
  {
    icon: <Baby size={32} />,
    title: 'Maternity Photography',
    subtitle: 'Celebrating New Life',
    description: 'Pregnancy is a beautiful journey deserving of beautiful photographs. Our maternity sessions are designed to make you feel comfortable, confident, and radiant as we capture this incredible chapter of your life.',
    features: ['Indoor & outdoor sessions', 'Professional styling advice', 'Props included', 'Partner & family welcome', '100+ edited images', 'Signature print collection'],
    category: 'MATERNITY',
  },
  {
    icon: <Heart size={32} />,
    title: 'Kids Photography',
    subtitle: 'Little Moments, Big Memories',
    description: 'Children grow up so fast! Our kid-friendly photographers know how to engage with children to capture their genuine smiles, laughter, and personality. Every session is a fun adventure.',
    features: ['Child-friendly environment', 'Props & backgrounds provided', 'Patient & playful approach', 'Sibling sessions welcome', 'Birthday & milestone themes', 'Canvas prints available'],
    category: 'KIDS',
  },
  {
    icon: <Shirt size={32} />,
    title: 'Fashion Photography',
    subtitle: 'Style Meets Artistry',
    description: 'Our fashion photography combines technical excellence with creative vision to produce stunning images for portfolios, brands, and editorial use. We work with models, designers, and brands to bring their vision to life.',
    features: ['Portfolio shoots', 'Brand collaborations', 'Editorial photography', 'Lookbook creation', 'Styling assistance', 'Commercial licensing'],
    category: 'FASHION',
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Corporate Events',
    subtitle: 'Professional Business Coverage',
    description: 'Professional event photography for conferences, seminars, award ceremonies, and corporate gatherings. We deliver polished, publication-ready images that represent your brand perfectly.',
    features: ['Conference coverage', 'Corporate portraits', 'Award ceremonies', 'Team building events', 'Product launches', 'Same day delivery available'],
    category: 'CORPORATE',
  },
  {
    icon: <Film size={32} />,
    title: 'Commercial Shoots',
    subtitle: 'Products That Sell',
    description: 'High-quality commercial photography for products, advertisements, and brand campaigns. We work with creative directors and brands to deliver images that communicate your brand message effectively.',
    features: ['Product photography', 'Advertising campaigns', 'Social media content', 'E-commerce images', 'Studio & location shoots', 'Retouching included'],
    category: 'COMMERCIAL',
  },
];

const Services = () => {
  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-tag" style={{ justifyContent: 'center' }}>What We Offer</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Our Services</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: 'var(--space-md) auto 0', textAlign: 'center' }}>
              Professional photography and videography services tailored to capture every milestone
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                  gap: 'var(--space-3xl)',
                  alignItems: 'center',
                }}
              >
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <div style={{
                    width: 64, height: 64,
                    background: 'rgba(212,165,87,0.1)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold-300)',
                    marginBottom: 'var(--space-lg)',
                  }}>
                    {service.icon}
                  </div>
                  <p style={{ color: 'var(--gold-300)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 'var(--space-sm)' }}>
                    {service.subtitle}
                  </p>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-lg)' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-xl)' }}>
                    {service.description}
                  </p>
                  <Link to={`/packages`} className="btn btn-outline" style={{ fontSize: 'var(--text-sm)' }}>
                    View Packages
                  </Link>
                </div>

                <div style={{ order: i % 2 === 0 ? 1 : 0, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)' }}>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
                    What's Included
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    {service.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--gold-300)', fontSize: '0.7rem' }}>✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)' }}>
                    <Link to={`/portfolio?cat=${service.category}`} style={{ color: 'var(--gold-300)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                      View {service.title} Gallery →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-4xl) 0', textAlign: 'center', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 className="section-title">Ready to Book?</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
            Contact us to discuss your vision and get a custom quote
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link to="/packages" className="btn btn-outline">View Packages</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
