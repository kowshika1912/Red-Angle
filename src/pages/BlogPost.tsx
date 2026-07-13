import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';

import img1 from '../assets/download (2).jpg';
import img2 from '../assets/download (3).jpg';
import img3 from '../assets/download (4).jpg';

const fallbackPosts = [
  {
    id: '1',
    title: 'The Art of Capturing Authentic Wedding Moments',
    slug: 'authentic-wedding-moments',
    excerpt: 'Discover our approach to documentary-style wedding photography that tells your true love story without forcing unnatural poses.',
    content: '<p style="margin-bottom: 1.5rem">Photography is more than just clicking a button; it\'s about capturing a feeling, a moment, a memory that will last a lifetime. When we approach wedding photography, our primary goal is authenticity. We want you to look back at your photos and remember exactly how you felt, not just how you were posed.</p><h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 400; margin: 2rem 0 1rem; color: var(--gold-300);">The Importance of Being Present</h3><p style="margin-bottom: 1.5rem">One of the most common mistakes couples make is worrying too much about the camera. We always advise our clients to just be present. The best photos happen when you forget we are even there. It\'s the tear rolling down a father\'s cheek, the subtle squeeze of a hand, the unfiltered burst of laughter during speeches.</p><p style="margin-bottom: 1.5rem">Our documentary approach ensures that these fleeting moments are preserved forever. We blend into the background, allowing your day to unfold naturally while we meticulously document the magic as it happens.</p>',
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
    content: '<p style="margin-bottom: 1.5rem">Choosing the right location for your pre-wedding shoot sets the tone for your entire wedding narrative. We\'ve scoured the country to find the most breathtaking backdrops that elevate your photos from standard portraits to cinematic masterpieces.</p><h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 400; margin: 2rem 0 1rem; color: var(--gold-300);">1. The Heritage Palace</h3><p style="margin-bottom: 1.5rem">Nothing says royalty like a centuries-old palace. The intricate architecture, sprawling courtyards, and warm sandstone provide an incredibly rich texture for your photos.</p><h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 400; margin: 2rem 0 1rem; color: var(--gold-300);">2. The Misty Hills</h3><p style="margin-bottom: 1.5rem">If you prefer a moody, romantic vibe, head to the hills during the early morning. The fog rolling through the trees creates a natural softbox that is a photographer\'s dream.</p>',
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
    content: '<p style="margin-bottom: 1.5rem">Maternity photography is deeply personal and requires a delicate touch. The key to creating those ethereal, glowing portraits that expectant mothers love is entirely dependent on lighting.</p><h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 400; margin: 2rem 0 1rem; color: var(--gold-300);">Natural Window Light</h3><p style="margin-bottom: 1.5rem">There is nothing quite like the soft, diffused light of a large north-facing window. It wraps around the subject beautifully, highlighting the maternal glow while softly shadowing the curves.</p><h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 400; margin: 2rem 0 1rem; color: var(--gold-300);">Studio Silhouettes</h3><p style="margin-bottom: 1.5rem">For a more dramatic and artistic approach, we love using strong backlighting to create striking silhouettes. This technique celebrates the incredible shape of pregnancy and results in a timeless piece of art.</p>',
    coverImage: img2,
    publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    tags: ['Maternity', 'Behind the Scenes'],
    author: { name: 'Arjun Patel' }
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = fallbackPosts.find(p => p.slug === slug);

  const formatDate = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

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
                  src={post.coverImage}
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
