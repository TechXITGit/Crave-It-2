import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Sparkles, ArrowUpRight, Flame } from 'lucide-react';
import { COMBOS } from '../data/combos';
import { useCart } from '../context/CartContext';

export const CombosSection = () => {
  const { addToCart } = useCart();
  const combos = COMBOS;

  return (
    <section
      style={{
        padding: 'clamp(3.5rem, 8vw, 7rem) 0',
        backgroundColor: 'var(--color-bg-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3rem'
          }}
        >
          <span className="editorial-tag" style={{ marginBottom: '0.75rem' }}>
            SIGNATURE COMBINATIONS
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.75rem'
            }}
          >
            <div>
              <h2 className="section-headline">
                MORE BITES.<br />
                MORE JOY.
              </h2>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.35rem, 2.5vw, 2.2rem)',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginBottom: '0.4rem'
                }}
              >
                "GOOD FOOD DOESN'T NEED A BIG BUDGET."
              </p>
              <p className="section-subline">
                Curated royal meal bundles designed for hearty cravings, solo feasts,
                and shared gatherings.
              </p>
            </div>
          </div>
        </div>

        {/* Combos Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2rem)'
          }}
        >
          {combos.map((combo, idx) => {
            const isHeroHighlight = idx === 0; // Biryani + Coke with Yellow accent background

            return (
              <div
                key={combo.id}
                style={{
                  position: 'relative',
                  backgroundColor: isHeroHighlight ? 'var(--color-yellow)' : 'var(--color-bg-secondary)',
                  border: isHeroHighlight ? '1.5px solid #E59A12' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.25rem, 4vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHeroHighlight
                    ? '0 20px 40px -10px rgba(247, 203, 40, 0.4)'
                    : 'var(--shadow-subtle)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Top Badge */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}
                  >
                    <span
                      style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: isHeroHighlight ? 'var(--color-cobalt)' : 'rgba(23, 70, 210, 0.1)',
                        color: isHeroHighlight ? 'var(--color-white)' : 'var(--color-cobalt)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {combo.specialDays || 'COMBO SAVER'}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: isHeroHighlight ? 'var(--color-charcoal)' : 'var(--color-muted)'
                      }}
                    >
                      {combo.pieces}
                    </span>
                  </div>

                  {/* Food Image */}
                  <div
                    style={{
                      height: '190px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '1rem 0'
                    }}
                  >
                    <img
                      src={combo.image}
                      alt={combo.name}
                      style={{
                        maxHeight: '170px',
                        maxWidth: '85%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.18))'
                      }}
                    />
                  </div>

                  {/* Title & Desc */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      lineHeight: 0.95,
                      color: isHeroHighlight ? 'var(--color-charcoal)' : 'var(--color-cobalt)',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {combo.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: isHeroHighlight ? 'rgba(23, 23, 23, 0.8)' : 'var(--color-muted)',
                      lineHeight: 1.45,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {combo.desc}
                  </p>
                </div>

                {/* Price and Add button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: `1px solid ${isHeroHighlight ? 'rgba(23, 23, 23, 0.15)' : 'var(--border-subtle)'}`,
                    paddingTop: '1rem'
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: isHeroHighlight ? 'rgba(23, 23, 23, 0.7)' : 'var(--color-muted)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {combo.price ? 'SPECIAL PRICE' : 'CURATED PAIRING'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      {combo.price ? (
                        <>
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '2rem',
                              color: 'var(--color-cobalt)',
                              lineHeight: 1
                            }}
                          >
                            ₹{combo.price}
                          </span>
                          {combo.fullPrice && (
                            <span
                              style={{
                                fontSize: '0.9rem',
                                textDecoration: 'line-through',
                                color: isHeroHighlight ? 'rgba(23, 23, 23, 0.5)' : 'var(--color-muted)'
                              }}
                            >
                              ₹{combo.fullPrice}
                            </span>
                          )}
                        </>
                      ) : (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'var(--color-cobalt)',
                            backgroundColor: 'rgba(23, 70, 210, 0.1)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-pill)'
                          }}
                        >
                          PRICE ON REQUEST
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(combo, 'full', 1)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.7rem 1.4rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isHeroHighlight ? 'var(--color-cobalt)' : 'var(--color-cobalt)',
                      color: 'var(--color-white)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-deep-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-cobalt)';
                    }}
                  >
                    <Plus size={15} strokeWidth={3} />
                    ADD COMBO
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
