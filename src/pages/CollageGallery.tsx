import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Loader } from 'lucide-react';
import api, { getImageUrl } from '../api/client';
import { Album, Image as AlbumImage } from '../types';
import './CollageGallery.css';

// Fallback media in case the database is empty or doesn't have enough content
const FALLBACK_MEDIA: Record<string, { url: string, type: 'image' | 'video', title: string }[]> = {
  WEDDING: [
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'The Vows' },
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'First Dance' },
    { url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', title: 'Wedding Highlight Reel' },
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'The Venue' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Just Married' },
    { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Rings' }
  ],
  PRE_WEDDING: [
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Sunset Walk' },
    { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Together' },
    { url: 'https://images.unsplash.com/photo-1621801306185-3e28409ee636?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Engagement' },
    { url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', title: 'Save The Date Video' }
  ],
  default: [
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Event' },
    { url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Moments' },
    { url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', title: 'Highlight Video' },
    { url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop', type: 'image', title: 'Details' }
  ]
};

const formatCategoryName = (cat: string | null) => {
  if (!cat) return 'All Galleries';
  return cat.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
}

const CollageGallery = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('cat');
  
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        // Step 1: Fetch albums for this category
        const url = category ? `/albums?category=${category}` : '/albums';
        const { data: albums } = await api.get<Album[]>(url);

        let items: MediaItem[] = [];

        // Step 2: If we have albums, fetch their full details to get all images
        if (albums && albums.length > 0) {
          for (const album of albums) {
            try {
              const { data: fullAlbum } = await api.get<Album>(`/albums/${album.id}`);
              if (fullAlbum && fullAlbum.images) {
                const mapped = fullAlbum.images.map(img => ({
                  id: img.id,
                  url: getImageUrl(img.url),
                  type: ((img as any).fileType === 'video' ? 'video' : 'image') as 'video' | 'image',
                  title: img.caption || fullAlbum.title
                }));
                items = [...items, ...mapped];
              }
            } catch (err) {
              console.error(`Failed to fetch images for album ${album.id}`, err);
            }
          }
        }

        // Step 3: Set items if any were found, otherwise we handle fallbacks below
        setMediaItems(items);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setIsLoading(false);
        // Fallback logic moved here to ensure it runs even if the API throws an error!
        setMediaItems(prev => {
          if (prev.length > 0) return prev;
          const fallbacks = category && FALLBACK_MEDIA[category] ? FALLBACK_MEDIA[category] : FALLBACK_MEDIA.default;
          return fallbacks.map((fb, idx) => ({
            id: `fallback-${idx}`,
            url: fb.url,
            type: fb.type,
            title: fb.title
          }));
        });
      }
    };

    fetchGallery();
  }, [category]);

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      
      {/* Hero Section */}
      <section className="collage-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="collage-hero-title"
        >
          {formatCategoryName(category)} <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Collection</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="collage-hero-subtitle"
        >
          Explore a carefully curated mix of our finest photos and cinematic videos, telling complete, beautiful stories.
        </motion.p>
      </section>

      {/* Gallery Section */}
      <section className="collage-container">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader size={32} className="animate-spin" style={{ color: 'var(--text-primary)' }} />
          </div>
        ) : (
          <div className="collage-masonry">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="collage-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'video' ? (
                  <>
                    <video 
                      src={item.url} 
                      muted 
                      loop 
                      playsInline 
                      onMouseOver={(e) => e.currentTarget.play()} 
                      onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    />
                    <div className="video-icon"><Play size={24} fill="currentColor" /></div>
                  </>
                ) : (
                  <img src={item.url} alt={item.title} loading="lazy" />
                )}
                
                <div className="collage-item-overlay">
                  <h3 className="collage-item-title">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="collage-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div 
              className="collage-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="collage-lightbox-close"
                onClick={() => setSelectedMedia(null)}
              >
                <X size={32} />
              </button>
              
              {selectedMedia.type === 'video' ? (
                <video src={selectedMedia.url} controls autoPlay style={{ width: '100%', outline: 'none' }} />
              ) : (
                <img src={selectedMedia.url} alt={selectedMedia.title} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CollageGallery;
