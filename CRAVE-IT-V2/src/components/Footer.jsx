import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';
import { CATEGORIES } from '../data/categories';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '5.5rem 0 2.5rem',
        position: 'relative'
      }}
    >
      <div className="container-wide">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr',
            gap: '3rem',
            marginBottom: '4.5rem'
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand & Identity */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                marginBottom: '1.25rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  color: 'var(--color-cobalt)',
                  letterSpacing: '0.04em',
                  lineHeight: 1
                }}
              >
                CRAVE IT
              </span>
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-yellow)',
                  display: 'inline-block'
                }}
              />
            </Link>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                maxWidth: '320px',
                marginBottom: '1.75rem'
              }}
            >
              Experimental minimalist food ordering crafted with Swiss design
              clarity and centuries-old Awadhi culinary heritage.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={RESTAURANT_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cobalt)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-cobalt)';
                  e.currentTarget.style.color = 'var(--color-yellow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-cobalt)';
                }}
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href={RESTAURANT_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cobalt)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-cobalt)';
                  e.currentTarget.style.color = 'var(--color-yellow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-cobalt)';
                }}
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}
            >
              DIRECTORY
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Home', 'Menu', 'Combos', 'About', 'Contact', 'Cart'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cobalt)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Menu Categories */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}
            >
              FLAVOURS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {CATEGORIES.slice(1, 7).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/menu?category=${encodeURIComponent(cat.id)}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cobalt)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact & Opening Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}
            >
              KITCHEN & LOCATION
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: 'var(--color-muted)' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--color-cobalt)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cobalt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                >
                  {RESTAURANT_INFO.address}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Phone size={18} color="var(--color-cobalt)" style={{ flexShrink: 0 }} />
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cobalt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Mail size={18} color="var(--color-cobalt)" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cobalt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Clock size={18} color="var(--color-yellow)" style={{ flexShrink: 0 }} />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Fine Print */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'var(--color-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} CRAVE IT. All rights reserved. Built with pride for Awadhi heritage cuisine.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>CONCEPT 02 • MINIMALIST EXPERIMENTAL</span>
            <span>NO PLACEHOLDERS • REAL FOOD ONLY</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
