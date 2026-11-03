import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const PromoCta = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-cobalt)',
        color: 'var(--color-white)',
        padding: 'clamp(3.5rem, 8vw, 7rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Yellow Circles in Background */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(240px, 35vw, 500px)',
          height: 'clamp(240px, 35vw, 500px)',
          borderRadius: '50%',
          backgroundColor: 'rgba(247, 203, 40, 0.15)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating Food Object: Golden Chicken Drumstick Cutout */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '20%',
          width: 'clamp(120px, 18vw, 240px)',
          zIndex: 3,
          filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.45))'
        }}
        className="promo-drumstick animate-float-1"
      >
        <img
          src="/images/food/chicken-drumstick.png"
          alt="Golden Crispy Drumstick"
          style={{ width: '100%', height: 'auto', transform: 'rotate(-20deg)' }}
        />
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 4 }}>
        <div style={{ maxWidth: '780px' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-yellow)',
              marginBottom: '1rem'
            }}
          >
            FRESH • HOT • DELIVERED FAST
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 8vw, 7.5rem)',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: 'var(--color-white)',
              marginBottom: '1.75rem',
              letterSpacing: '0.01em'
            }}
          >
            WHAT ARE YOU<br />
            <span style={{ color: 'var(--color-yellow)' }}>CRAVING</span> TODAY?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.6,
              maxWidth: '520px',
              marginBottom: '2.5rem'
            }}
          >
            Order your favorite Awadhi Biryanis, succulent melt-in-mouth Galawati
            kebabs, and buttery layered parathas directly to your doorstep.
          </p>

          <div className="promo-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <Link to="/menu" className="btn-yellow">
              ORDER YOUR FAVOURITE
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </Link>
            <Link
              to="/combos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 1.75rem',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                color: 'var(--color-white)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-tag)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-pill)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'var(--color-white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              }}
            >
              EXPLORE COMBO MEALS
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .promo-drumstick {
            opacity: 0.25;
            right: -2% !important;
            width: 130px !important;
          }
          .promo-actions {
            flex-direction: column;
            width: 100%;
          }
          .promo-actions a {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};
