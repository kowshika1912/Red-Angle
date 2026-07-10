import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import api, { getImageUrl } from '../api/client';
import { BlogPost } from '../types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/blog?limit=20')
      .then(r => setPosts(r.data.posts || r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.excerpt || '').toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Insights & Stories</div>
            <h1 className="section-title" style={{ marginTop: 'var(--space-md)' }}>Our Blog</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: 'var(--space-md) auto', textAlign: 'center' }}>
              Photography tips, client stories, and behind-the-scenes updates
            </p>
            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 400, margin: '0 auto' }}>
              <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {loading ? (
            <div className="blog-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="blog-card">
                  <div className="skeleton" style={{ height: 220 }} />
                  <div style={{ padding: 'var(--space-xl)' }}>
                    <div className="skeleton" style={{ height: 14, width: '30%', marginBottom: 12 }} />
                    <div className="skeleton" style={{ height: 22, marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 14, marginBottom: 4 }} />
                    <div className="skeleton" style={{ height: 14, width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
              <p style={{ color: 'var(--text-muted)' }}>No articles found</p>
            </div>
          ) : (
            <motion.div
              className="blog-grid"
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
                  <Link to={`/blog/${post.slug}`} className="blog-card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
                    <div className="blog-card-image">
                      {post.coverImage ? (
                        <img src={getImageUrl(post.coverImage)} alt={post.title} loading="lazy" />
                      ) : (
                        <div className="img-placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--color-surface), var(--color-surface-2))' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'rgba(212,165,87,0.1)', fontStyle: 'italic' }}>R</span>
                        </div>
                      )}
                    </div>
                    <div className="blog-card-body">
                      {(post.tags as string[]).length > 0 && (
                        <div className="blog-tags">
                          {(post.tags as string[]).slice(0, 3).map((tag, j) => (
                            <span key={j} className="blog-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <h2 className="blog-card-title">{post.title}</h2>
                      {post.excerpt && (
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                      )}
                      <div className="blog-card-meta">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={12} />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <User size={12} />
                          {post.author?.name || 'Red-Angle Studio'}
                        </span>
                        <span style={{ color: 'var(--gold-300)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          Read more <ArrowRight size={12} />
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
