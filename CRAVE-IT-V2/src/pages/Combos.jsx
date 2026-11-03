import React from 'react';
import { Plus, Check, Sparkles,Utensils, Clock, Users, ArrowUpRight } from 'lucide-react';
import { COMBOS } from '../data/combos';
import { useCart } from '../context/CartContext';

export const Combos = () => {
  const { addToCart } = useCart();
  const combos = COMBOS;

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
        <div style={{ marginBottom: '4rem' }}>
          <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
            VALUE FEAST PACKAGES
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
              THE COMBO<br />
              COLLECTION.
            </h1>
            <p className="section-subline">
              Curated pairings of our most sought-after Awadhi creations.
              Exceptional flavor combinations designed for royal indulgence without compromise.
            </p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-yellow)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            marginBottom: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            border: '2px solid #E59A12',
            boxShadow: '0 20px 40px -15px rgba(247, 203, 40, 0.45)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cobalt)',
                color: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Utensils size={22} color="var(--color-yellow)" />
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--color-charcoal)',
                  lineHeight: 1,
                  textTransform: 'uppercase'
                }}
              >
                CURATED FROM 107 AUTHENTIC RESTAURANT DISHES
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'rgba(23,23,23,0.85)', marginTop: '0.2rem' }}>
                Each combo meal pairs dishes directly transcribed from the restaurant's handwritten menu.
              </p>
            </div>
          </div>
          <button
            onClick={() => addToCart(combos[0], 'full', 1)}
            className="btn-primary"
            style={{ backgroundColor: 'var(--color-cobalt)' }}
          >
            ADD FEATURED COMBO
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Detailed Combos Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {combos.map((combo) => (
            <div
              key={combo.id}
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 2fr 1fr',
                gap: '2.5rem',
                alignItems: 'center',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="combo-card-grid"
            >
              {/* Image Preview: Pure Transparent PNG cutout */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '220px',
                  backgroundColor: 'var(--color-bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={combo.image}
                  alt={combo.name}
                  style={{
                    maxHeight: '190px',
                    maxWidth: '92%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.12))'
                  }}
                />
              </div>

              {/* Combo Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.7rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'rgba(23, 70, 210, 0.1)',
                      color: 'var(--color-cobalt)',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {combo.badge || 'COMBO SPECIAL'}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                    {combo.serves}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    color: 'var(--color-cobalt)',
                    textTransform: 'uppercase',
                    lineHeight: 0.95,
                    marginBottom: '0.75rem'
                  }}
                >
                  {combo.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem'
                  }}
                >
                  {combo.desc}
                </p>

                {/* Included Items */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {combo.items && combo.items.map((it, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--color-bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--color-charcoal)'
                      }}
                    >
                      ✓ {it}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderLeft: '1px solid var(--border-subtle)',
                  paddingLeft: '2.5rem'
                }}
                className="combo-cta-col"
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  COMBO PRICING
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', margin: '0.25rem 0 1.25rem' }}>
                  {combo.price ? (
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3rem',
                        color: 'var(--color-cobalt)',
                        lineHeight: 1
                      }}
                    >
                      ₹{combo.price}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-cobalt)',
                        backgroundColor: 'rgba(23, 70, 210, 0.1)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    >
                      PRICE ON REQUEST
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(combo, 'full', 1)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Plus size={16} strokeWidth={3} />
                  ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .combo-card-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .combo-cta-col {
            border-left: none !important;
            border-top: 1px solid var(--border-subtle) !important;
            padding-left: 0 !important;
            padding-top: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Combos;
