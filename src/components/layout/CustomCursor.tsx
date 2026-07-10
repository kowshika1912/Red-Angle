import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('card') ||
        target.classList.contains('gallery-item')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'transparent',
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: 'rgba(212, 165, 87, 0.1)',
      border: '1px solid rgba(212, 165, 87, 0.5)',
    }
  };

  return (
    <>
      <motion.div
        className="custom-cursor"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid rgba(212, 165, 87, 0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference'
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: mousePosition.y - 3,
          left: mousePosition.x - 3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#d4a557',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body {
            cursor: none;
          }
          a, button, .card {
            cursor: none !important;
          }
        }
        @media (hover: none) and (pointer: coarse) {
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
