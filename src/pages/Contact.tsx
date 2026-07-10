import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import api from '../api/client';
import toast from 'react-hot-toast';

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);


const serviceOptions = [
  'Wedding Photography',
  'Pre-Wedding Shoot',
  'Candid Photography',
  'Maternity Photography',
  'Kids Photography',
  'Fashion Photography',
  'Corporate Event',
  'Commercial Shoot',
  'Other',
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      toast.success('Message sent! We\'ll get back to you soon.');
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Get In Touch</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Contact Us</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: 'var(--space-md) auto 0', textAlign: 'center' }}>
              Let's discuss your vision and create something extraordinary together
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="section-tag">Reach Out</div>
                <h2 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-heading)', marginTop: 'var(--space-md)', lineHeight: 1.1 }}>
                  Let's Create<br />
                  <span style={{ background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Magic Together
                  </span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 'var(--space-lg)' }}>
                  Ready to capture your precious moments? Reach out to us and we'll help you plan the perfect photography experience.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {[
                  { icon: <Phone size={18} />, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'hello@redanglestudio.com', href: 'mailto:hello@redanglestudio.com' },
                  { icon: <MapPin size={18} />, label: 'Location', value: '123 Studio Lane, Mumbai, Maharashtra 400001', href: '#' },
                ].map((item, i) => (
                  <div key={i} className="contact-info-item">
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <a href={item.href} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', transition: 'color 0.2s' }}>
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                  Follow Us
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                  {[
                    { icon: <InstagramIcon />, href: 'https://instagram.com', label: 'Instagram' },
                    { icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
                    { icon: <YoutubeIcon />, href: 'https://youtube.com', label: 'YouTube' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-link" aria-label={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Map */}
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', aspectRatio: '16/9' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160989929!2d72.74109780!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Red-Angle Studio Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {submitted ? (
                <div className="contact-form" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 500 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(212,165,87,0.1)', border: '1px solid var(--gold-300)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto var(--space-xl)',
                  }}>
                    <Send size={32} color="var(--gold-300)" />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: 'var(--space-xl)' }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>Send a Message</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-sm)' }}>
                    We'll get back to you within 24 hours
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        className="form-input"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        required placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        className="form-input"
                        type="email"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        required placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-input"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Service Needed</label>
                      <select
                        className="form-input"
                        value={form.service}
                        onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                        style={{ background: 'var(--color-surface)' }}
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-input"
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      required
                      placeholder="Tell us about your event date, location, and any special requirements..."
                      style={{ minHeight: 140 }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Sending...' : (<><Send size={16} /> Send Message</>)}
                  </button>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Or WhatsApp us directly at{' '}
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ color: '#25d366' }}>
                      +91 98765 43210
                    </a>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
