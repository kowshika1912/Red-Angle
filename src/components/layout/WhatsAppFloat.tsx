import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi%20Red-Angle%20Studio!%20I%20would%20like%20to%20enquire%20about%20your%20photography%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </motion.a>
  );
};

export default WhatsAppFloat;
