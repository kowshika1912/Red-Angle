import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import api, { getImageUrl } from '../api/client';
import { BlogPost as BlogPostType } from '../types';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.get(`/blog/${slug}`)
      .then(r => setPost(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div style={{ padding: '160px 0 var(--space-4xl)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="skeleton" style={{ height: 60, marginBottom: 'var(--space-xl)' }} />
          <div className="skeleton" style={{ height: 400, marginBottom: 'var(--space-xl)' }} />
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 18, marginBottom: 12 }} />)}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '160px 0' }}>
        <h1>Post not found</h1>
        <Link to="/blog" className="btn btn-outline" style={{ marginTop: 'var(--space-xl)', display: 'inline-flex' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ paddingTop: 120, paddingBottom: 'var(--space-4xl)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/blog"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2xl)', fontSize: 'var(--text-sm)' }}
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            {(post.tags as string[]).length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)' }}>
                {(post.tags as string[]).map((tag, i) => (
                  <span key={i} className="blog-tag">{tag}</span>
                ))}
              </div>
            )}

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: 'var(--space-xl)' }}>
              {post.title}
            </h1>

            <div style={{ display: 'flex', gap: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} /> {formatDate(post.publishedAt)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} /> {post.author?.name || 'Red-Angle Studio'}
              </span>
            </div>

            {post.coverImage && (
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-2xl)', aspectRatio: '16/9' }}>
                <img
                  src={getImageUrl(post.coverImage)}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <div
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.9,
                fontSize: 'var(--text-lg)',
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div style={{
              marginTop: 'var(--space-3xl)',
              padding: 'var(--space-2xl)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Ready to Create Your Story?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
                Contact us to book your photography session
              </p>
              <Link to="/contact" className="btn btn-primary">Book Now</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
