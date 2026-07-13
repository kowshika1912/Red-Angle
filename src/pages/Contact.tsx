import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import api from '../api/client';
import toast from 'react-hot-toast';

import heroBg from '../assets/hand.jpg';

const InfoCard = ({ icon, title, children, linkText, linkHref }: any) => (
  <div style={{
    backgroundColor: '#f9f9f9',
    padding: '2rem 1.5rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid #f0f0f0',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}
  onMouseOver={e => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
  }}
  onMouseOut={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}>
    <div style={{ color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
      {title}
    </h3>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
      {children}
    </div>
    <a href={linkHref} style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      color: 'var(--gold-300)', 
      textDecoration: 'none', 
      fontSize: '0.85rem',
      fontWeight: 500,
      marginTop: 'auto'
    }}>
      {linkText} <ArrowRight size={14} />
    </a>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      setForm({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    backgroundColor: '#f4f4f4',
    border: '1px solid transparent',
    borderRadius: '4px',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    outline: 'none',
    marginBottom: '1rem',
    transition: 'border-color 0.3s ease',
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
      
      {/* Top Section */}
      <section style={{ 
        paddingTop: '6rem', 
        marginTop: '90px', // Push below fixed navbar
        paddingBottom: '6rem', 
        textAlign: 'center', 
        paddingX: '1rem',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontFamily: 'var(--font-heading)', 
            textTransform: 'uppercase', 
            fontWeight: 400,
            letterSpacing: '2px',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            color: '#eeeeee', 
            maxWidth: '700px', 
            margin: '0 auto', 
            fontSize: '1.05rem', 
            lineHeight: 1.7 
          }}>
            We'd love to discuss your vision. Reach out to our support team and let's create something extraordinary together. From grand weddings to intimate portraits, we capture every detail.
          </p>
        </motion.div>
      </section>

      {/* Middle Section (Get In Touch + Cards) */}
      <section style={{ padding: '3rem 5%' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '3rem',
          alignItems: 'stretch'
        }}>
          
          {/* Left Title */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div style={{ 
                color: 'var(--gold-300)', 
                fontWeight: 600, 
                fontSize: '0.8rem', 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{ color: 'var(--gold-300)' }}>//</span> Contact us
              </div>
              <h2 style={{ 
                fontSize: 'clamp(3rem, 5vw, 4rem)', 
                fontFamily: 'var(--font-heading)', 
                color: 'var(--gold-300)', 
                lineHeight: 1.1, 
                textTransform: 'uppercase',
                fontWeight: 400
              }}>
                Get In<br/>Touch
              </h2>
            </motion.div>
          </div>

          {/* Right Cards */}
          <div style={{ flex: '3 1 650px' }}>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '1.5rem',
                height: '100%'
              }}
            >
              <InfoCard 
                icon={<MapPin size={32} strokeWidth={1} />} 
                title="Office Location" 
                linkText="Direction" 
                linkHref="#"
              >
                123 Studio Lane, Mumbai,<br />
                Maharashtra 400001
              </InfoCard>
              
              <InfoCard 
                icon={<Clock size={32} strokeWidth={1} />} 
                title="Working Hours" 
                linkText="Learn more" 
                linkHref="#"
              >
                Sun to Fri: <strong>10am</strong> to <strong>06pm</strong><br />
                Sat: <strong>10am</strong> to <strong>02pm</strong>
              </InfoCard>
              
              <InfoCard 
                icon={<Phone size={32} strokeWidth={1} />} 
                title="Communication" 
                linkText="Support" 
                linkHref="tel:+919876543210"
              >
                +91 98765 43210<br />
                hello@redanglestudio.com
              </InfoCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Section (Form + Have any query) */}
      <section style={{ padding: '2rem 5% 6rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            backgroundColor: '#fafafa', 
            borderRadius: '8px', 
            display: 'flex', 
            flexWrap: 'wrap-reverse', 
            border: '1px solid #f0f0f0'
          }}
        >
          
          {/* Form Side */}
          <div style={{ flex: '1 1 450px', padding: '4rem' }}>
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '3rem', 
              borderRadius: '8px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
            }}>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="What's your Name?" 
                  style={inputStyle}
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                  onFocus={e => e.target.style.borderColor = 'var(--gold-300)'}
                  onBlur={e => e.target.style.borderColor = 'transparent'}
                />
                
                <input 
                  type="email" 
                  placeholder="Your email" 
                  style={inputStyle}
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                  onFocus={e => e.target.style.borderColor = 'var(--gold-300)'}
                  onBlur={e => e.target.style.borderColor = 'transparent'}
                />
                
                <textarea 
                  placeholder="Message" 
                  style={{ ...inputStyle, minHeight: '150px', resize: 'none' }}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  required
                  onFocus={e => e.target.style.borderColor = 'var(--gold-300)'}
                  onBlur={e => e.target.style.borderColor = 'transparent'}
                />
                
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    backgroundColor: 'var(--gold-300)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                    opacity: loading ? 0.8 : 1,
                    display: 'inline-block'
                  }}
                  onMouseOver={e => { if(!loading) e.currentTarget.style.backgroundColor = 'var(--gold-400)' }}
                  onMouseOut={e => { if(!loading) e.currentTarget.style.backgroundColor = 'var(--gold-300)' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Query Side */}
          <div style={{ flex: '1 1 400px', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: 'var(--text-primary)', 
              marginBottom: '0.5rem' 
            }}>
              Have any query?
            </h4>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--gold-300)', 
              textTransform: 'uppercase', 
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: '1.5rem'
            }}>
              Contact Us
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: '450px'
            }}>
              There is necessary to evaluate the most optimal solution for your photography needs. Our organization strives to surprise and exceed expectations across various services. Reach out to discuss the possibilities.
            </p>
          </div>

        </motion.div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '0 5% 6rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #f0f0f0',
            height: '400px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.02)'
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160989929!2d72.74109780!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Red-Angle Studio Location"
          />
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;
