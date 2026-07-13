import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Sparkles } from 'lucide-react';
import api from '../api/client';
import { BlogPost } from '../types';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';

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

const fallbackPosts = [
  {
    id: '1',
    title: 'The Art of Capturing Authentic Wedding Moments',
    slug: 'authentic-wedding-moments',
    excerpt: 'Discover our approach to documentary-style wedding photography that tells your true love story without forcing unnatural poses.',
    content: '',
    coverImage: img1,
    publishedAt: new Date().toISOString(),
    tags: ['Wedding', 'Tips'],
    author: { name: 'Rahul Verma' }
  },
  {
    id: '2',
    title: 'Top 5 Locations for Pre-Wedding Shoots',
    slug: 'top-pre-wedding-locations',
    excerpt: 'From architectural marvels to serene landscapes, explore our favorite destinations for creating cinematic pre-wedding magic.',
    content: '',
    coverImage: img3,
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    tags: ['Locations', 'Pre-Wedding'],
    author: { name: 'Priya Sharma' }
  },
  {
    id: '3',
    title: 'Why Lighting is Everything in Maternity Portraits',
    slug: 'maternity-lighting',
    excerpt: 'A behind-the-scenes look at how we use natural and studio lighting to create ethereal, glowing maternity portraits.',
    content: '',
    coverImage: img2,
    publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    tags: ['Maternity', 'Behind the Scenes'],
    author: { name: 'Arjun Patel' }
  }
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');

  const filtered = search ? fallbackPosts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.excerpt || '').toLowerCase().includes(search.toLowerCase())
  ) : fallbackPosts;

  const formatDate = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="page-enter" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Cinematic Ambient Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80vh', background: 'radial-gradient(ellipse at 50% 0%, rgba(212,165,87,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />
      <style>{`
        .enhanced-blog-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
        }
        .enhanced-blog-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212,165,87,0.3);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2);
        }
        .enhanced-blog-card:hover .blog-image-hover {
          transform: scale(1.05);
        }
        .blog-image-hover {
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-title {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--text-main);
          margin-bottom: 1rem;
          line-height: 1.3;
        }
      `}</style>
      <section className="page-hero" style={{ padding: '6rem 0 4rem', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'center', width: '100%' }}
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
                Insights & Stories
              </span>
              <Sparkles size={16} color="#d4a557" />
            </motion.div>
            
            <div style={{ overflow: 'hidden', paddingBottom: '0.5rem' }}>
              <motion.h1 variants={textRevealVariants} className="section-title" style={{ margin: 0, textAlign: 'center', fontSize: '4.5rem', fontWeight: '400', fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontStyle: 'italic', color: '#c5a059' }}>
                Our Blog
              </motion.h1>
            </div>
            
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '1.5rem auto 3rem', textAlign: 'center' }}>
              Photography tips, client stories, and behind-the-scenes updates
            </motion.p>
            
            {/* Search */}
            <motion.div variants={itemVariants} style={{ position: 'relative', maxWidth: 450, margin: '0 auto', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-300)' }} />
              <input
                style={{ 
                  width: '100%', 
                  padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                  borderRadius: '50px', 
                  border: '1px solid rgba(212, 165, 87, 0.3)', 
                  backgroundColor: 'rgba(212, 165, 87, 0.03)', 
                  color: 'var(--text-main)', 
                  fontSize: '1rem', 
                  outline: 'none', 
                  boxSizing: 'border-box',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold-300)'; e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(212,165,87,0.15)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212, 165, 87, 0.3)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)'; }}
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
              <p style={{ color: 'var(--text-muted)' }}>No articles found</p>
            </div>
          ) : (
            <motion.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filtered.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link to={`/blog/${post.slug}`} className="enhanced-blog-card">
                      <div className="featured-img-container" style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                        {post.coverImage && (
                          <img src={post.coverImage} alt={post.title} loading="lazy" className="blog-image-hover" />
                        )}
                        {/* Gradient Overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)', pointerEvents: 'none' }} />
                      </div>
                      <div className="featured-content-container" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {(post.tags as string[]).length > 0 && (
                          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            {(post.tags as string[]).slice(0, 3).map((tag, j) => (
                              <span key={j} style={{ fontSize: '0.75rem', color: 'var(--gold-300)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>{tag}</span>
                            ))}
                          </div>
                        )}
                        <h2 className="featured-title">{post.title}</h2>
                        {post.excerpt && (
                          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>{post.excerpt}</p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Calendar size={14} color="var(--gold-300)" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <User size={14} color="var(--gold-300)" />
                            {post.author?.name || 'Red-Angle'}
                          </span>
                          <span style={{ color: 'var(--text-main)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>
                            Read <ArrowRight size={14} color="var(--gold-300)" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
