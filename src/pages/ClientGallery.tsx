import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientGallery = () => {
  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section className="section" style={{ width: '100%' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ 
              background: 'var(--color-surface)', 
              padding: '4rem 2rem', 
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div className="section-tag" style={{ justifyContent: 'center' }}>Client Portal</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Access Your Gallery</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-md) auto 2rem', fontSize: '1.1rem' }}>
              Click the button below to securely log into your private client gallery and view your memories.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a 
                href="https://client.redanglestudio.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}
              >
                Client Login <ExternalLink size={18} />
              </a>
              
              <Link 
                to="/" 
                className="btn btn-outline"
                style={{ width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--color-border-2)' }}
              >
                <ChevronLeft size={18} /> Go Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ClientGallery;
