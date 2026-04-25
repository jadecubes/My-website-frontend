'use client';

import { useRef, useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { contact } from '@/lib/api';

export function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await contact.send(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', body: '' });
    } catch (err) {
      console.error('contact.send failed', err);
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--line)',
    borderRadius: '2px',
    color: 'var(--fg)',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div>
      <PageHero
        label="Contact"
        title={
          <>
            Let&apos;s work
            <br />
            <span style={{ fontStyle: 'italic' }}>together.</span>
          </>
        }
        description="Have a project in mind? Send a message and I'll get back to you as soon as possible."
        imageUrl="https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imagePosition="center 40%"
        onScrollDown={scrollToForm}
      />

      <div ref={formRef} className="max-w-2xl mx-auto px-6 pt-20 pb-24">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
            />
          </div>
          <input
            type="text"
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Tell me about your project..."
            value={form.body}
            onChange={e => setForm({ ...form, body: e.target.value })}
            required
            rows={6}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 text-sm rounded-sm transition-opacity"
            style={{
              backgroundColor: 'var(--fg)',
              color: 'var(--bg)',
              letterSpacing: '0.06em',
              opacity: status === 'loading' ? 0.6 : 1,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="text-sm" style={{ color: 'var(--accent)' }}>
              Message sent. I&apos;ll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm" style={{ color: '#e57373' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
