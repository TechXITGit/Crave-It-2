import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

export const StorySection = () => {
  return (
    <section
      style={{
        padding: 'clamp(3.5rem, 8vw, 8rem) 0',
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}
          className="story-grid"
        >
          {/* Left Column: Expressive Editorial Composition with Floating Cutout */}
          <div style={{ position: 'relative' }}>
            <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
              OUR PHILOSOPHY
            </span>
            <h2
              className="section-headline"
              style={{ marginBottom: '1.75rem' }}
            >
              MADE FOR<br />
              YOUR MOMENTS.
            </h2>

            {/* Visual Callout Box with Floating Food */}
            <div
              style={{
                position: 'relative',
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                border: '1px solid var(--border-subtle)',
                marginTop: '1.5rem',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-25px',
                  right: '-5px',
                  width: 'clamp(75px, 16vw, 115px)',
                  zIndex: 4
                }}
                className="animate-float-1"
              >
                <img
                  src="/images/food/lemon-hero.png"
                  alt="Citrus craft"
                  style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))' }}
                />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                  color: 'var(--color-cobalt)',
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                "WE BELIEVE FOOD IS AN EMOTION, NOT JUST FUEL."
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-muted)',
                  lineHeight: 1.6
                }}
              >
                Rooted in Lucknow's venerable Awadhi culinary tradition, CRAVE IT
                strips away the unnecessary clutter to focus on pure gastronomic
                joy: aromatic saffron, long-grain basmati, hand-pounded spices,
                and fiery tandoor embers.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Editorial Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Pillar 1 */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.25s ease'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(23, 70, 210, 0.1)',
                  color: 'var(--color-cobalt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Flame size={24} />
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--color-cobalt)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  Authentic Dum-Pukht Slow Cooking
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5
                  }}
                >
                  Our biryanis and gravies are sealed with dough in heavy deghs,
                  breathing on low charcoal embers so flavors harmonize without
                  losing moisture or aroma.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.25s ease'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(247, 203, 40, 0.25)',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={24} color="var(--color-cobalt)" />
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--color-cobalt)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  Uncompromising Freshness
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5
                  }}
                >
                  Every order is cooked fresh upon request. No artificial preservatives,
                  no heavy chemical dyes—just pure ghee, natural saffron, and real
                  botanical whole spices.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.25s ease'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(23, 70, 210, 0.1)',
                  color: 'var(--color-cobalt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--color-cobalt)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  Crafted for Modern Food Lovers
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5
                  }}
                >
                  A minimalist design system that makes exploring food as visually
                  rewarding as taking the first aromatic bite.
                </p>
              </div>
            </div>

            {/* Read Full Story Button */}
            <div>
              <Link to="/about" className="btn-outline">
                READ OUR HERITAGE STORY
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};
