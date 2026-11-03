import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

export const Contact = () => {
  const { showToast } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please provide your name';
    if (!form.phone.trim()) errs.phone = 'Contact number is required';
    if (!form.message.trim()) errs.message = 'Please type your message';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitted(true);
    showToast('Your message has been received! We will reach out shortly.');
    setForm({
      name: '',
      phone: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        paddingTop: 'calc(var(--header-height) + 3rem)',
        paddingBottom: '8rem'
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
            CONNECT WITH US
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem'
            }}
          >
            <h1 className="section-headline">
              KITCHEN &<br />
              CONVERSATIONS.
            </h1>
            <p className="section-subline">
              Whether you are planning a large catering banquet, have dietary queries,
              or wish to share your dining feedback, we are always listening.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Info Cards on Left, Contact Form on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '4rem',
            alignItems: 'flex-start'
          }}
          className="contact-split-grid"
        >
          {/* Left: Verified Contact Information Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Address Card */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-cobalt)',
                    color: 'var(--color-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: 'var(--color-cobalt)',
                      textTransform: 'uppercase',
                      marginBottom: '0.35rem'
                    }}
                  >
                    KITCHEN LOCATION
                  </h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {RESTAURANT_INFO.address}
                  </p>
                  <a
                    href={RESTAURANT_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                      textTransform: 'uppercase',
                      textDecoration: 'underline'
                    }}
                  >
                    Open in Google Maps
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-yellow)',
                    color: 'var(--color-charcoal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: 'var(--color-cobalt)',
                      textTransform: 'uppercase',
                      marginBottom: '0.35rem'
                    }}
                  >
                    ORDERS & HOTLINE
                  </h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '0.65rem' }}>
                    Direct orders, table takeaways, and kitchen inquiries:
                  </p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: 'var(--color-cobalt)',
                      display: 'block',
                      marginBottom: '0.75rem',
                      lineHeight: 1
                    }}
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <a
                    href={RESTAURANT_INFO.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                  >
                    <MessageSquare size={16} />
                    CHAT ON WHATSAPP
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Email Card */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(23, 70, 210, 0.1)',
                    color: 'var(--color-cobalt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: 'var(--color-cobalt)',
                      textTransform: 'uppercase',
                      marginBottom: '0.35rem'
                    }}
                  >
                    OPERATING SCHEDULE
                  </h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {RESTAURANT_INFO.hours}
                  </p>
                  <p style={{ color: 'var(--color-charcoal)', fontSize: '0.85rem' }}>
                    Email: <a href={`mailto:${RESTAURANT_INFO.email}`} style={{ color: 'var(--color-cobalt)', fontWeight: 600 }}>{RESTAURANT_INFO.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Modern Minimalist Form */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                lineHeight: 1
              }}
            >
              SEND US A MESSAGE
            </h3>

            {submitted && (
              <div
                style={{
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  color: '#2e7d32',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <CheckCircle2 size={20} />
                <span>Thank you! Your note has been delivered to our management desk.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rohini Roy"
                  value={form.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${errors.name ? '#d32f2f' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                {errors.name && <span style={{ color: '#d32f2f', fontSize: '0.72rem' }}>{errors.name}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-form-row">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${errors.phone ? '#d32f2f' : 'var(--border-subtle)'}`,
                      backgroundColor: 'var(--color-bg-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#d32f2f', fontSize: '0.72rem' }}>{errors.phone}</span>}
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. rohini@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-bg-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Topic / Nature of Inquiry
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="General Inquiry">General Question / Feedback</option>
                  <option value="Party Catering">Banquet & Event Catering</option>
                  <option value="Delivery Issue">Delivery Status Assistance</option>
                  <option value="Corporate Order">Bulk Corporate Lunches</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="How can our culinary team help you today?"
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${errors.message ? '#d32f2f' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
                {errors.message && <span style={{ color: '#d32f2f', fontSize: '0.72rem' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
              >
                SUBMIT INQUIRY
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
