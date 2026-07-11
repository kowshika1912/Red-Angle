import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Check, Trash2, X } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import api from '../../api/client';
import { ContactMessage } from '../../types';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const load = () => {
    api.get('/contact')
      .then(r => setMessages(r.data))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      await api.put(`/contact/${id}/read`);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
      setSelectedMsg(null);
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const unread = messages.filter(m => !m.isRead).length;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            Messages
            {unread > 0 && (
              <span style={{
                marginLeft: 'var(--space-sm)',
                background: 'var(--gradient-gold)',
                color: 'var(--color-bg)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                padding: '2px 8px',
                fontWeight: 700,
              }}>
                {unread} new
              </span>
            )}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            Contact form submissions from your website
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
        {/* Message List */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
          ) : messages.length === 0 ? (
            <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--text-muted)' }}>
              No messages yet
            </div>
          ) : messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => { setSelectedMsg(msg); if (!msg.isRead) markRead(msg.id); }}
              style={{
                padding: 'var(--space-lg)',
                borderBottom: '1px solid var(--color-border-2)',
                cursor: 'pointer',
                background: selectedMsg?.id === msg.id ? 'rgba(212,165,87,0.05)' : 'transparent',
                borderLeft: !msg.isRead ? '3px solid var(--gold-300)' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: !msg.isRead ? 600 : 400, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                  {msg.name}
                </div>
                {!msg.isRead && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold-300)', flexShrink: 0, marginTop: 3 }} />
                )}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginTop: 2 }}>{msg.email}</div>
              {msg.service && (
                <span className="badge badge-gold" style={{ marginTop: 'var(--space-xs)', fontSize: '0.65rem' }}>{msg.service}</span>
              )}
              <div style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                marginTop: 'var(--space-xs)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {msg.message}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: 'var(--space-xs)' }}>
                {formatDate(msg.createdAt)}
              </div>
            </div>
          ))}
        </div>

        {/* Message Detail */}
        <div>
          {selectedMsg ? (
            <motion.div
              key={selectedMsg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-xl)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-xl)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 4 }}>{selectedMsg.name}</h3>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                    <a href={`mailto:${selectedMsg.email}`} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                      <Mail size={14} /> {selectedMsg.email}
                    </a>
                    {selectedMsg.phone && (
                      <a href={`tel:${selectedMsg.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                        <Phone size={14} /> {selectedMsg.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  {!selectedMsg.isRead && (
                    <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: 'var(--text-xs)' }} onClick={() => markRead(selectedMsg.id)}>
                      <Check size={14} /> Mark Read
                    </button>
                  )}
                  <button style={{ color: '#f87171', padding: '0.4rem' }} onClick={() => handleDelete(selectedMsg.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {selectedMsg.service && (
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Service</span>
                  <div style={{ marginTop: 4 }}><span className="badge badge-gold">{selectedMsg.service}</span></div>
                </div>
              )}

              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message</span>
                <div style={{
                  marginTop: 'var(--space-sm)',
                  padding: 'var(--space-lg)',
                  background: 'var(--color-bg)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-2)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: 'var(--text-sm)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {selectedMsg.message}
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)' }}>
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.service || 'Your enquiry'}&body=Dear ${selectedMsg.name},%0A%0A`}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Mail size={16} /> Reply via Email
                </a>
                {selectedMsg.phone && (
                  <a
                    href={`https://wa.me/${selectedMsg.phone.replace(/\D/g, '')}?text=Hi ${selectedMsg.name}, thank you for contacting Red-Angle Studio!`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    WhatsApp
                  </a>
                )}
              </div>

              <div style={{ marginTop: 'var(--space-md)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                Received: {formatDate(selectedMsg.createdAt)}
              </div>
            </motion.div>
          ) : (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3xl)',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}>
              <Mail size={48} strokeWidth={0.5} style={{ margin: '0 auto var(--space-md)' }} />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
