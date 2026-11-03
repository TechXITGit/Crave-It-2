import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const CategorySection = () => {
  const [hoveredCat, setHoveredCat] = useState(CATEGORIES[1]); // Default to Biryanis

  // Filter out "all" for the homepage showcase
  const displayCategories = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <section
      style={{
        padding: 'clamp(3.5rem, 8vw, 7rem) 0',
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
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
            CURATED GASTRONOMY
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}
          >
            <h2 className="section-headline">
              FIND YOUR<br />
              FOOD MOOD.
            </h2>
            <p className="section-subline">
              From slow-simmered Awadhi dum biryanis to hand-stretched parathas
              and charred charcoal skewers. Select your mood to explore.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Typographic List on Left, Live Floating Image Preview on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="category-grid"
        >
          {/* Category List with Large Typography */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayCategories.map((cat, index) => {
              const isHovered = hoveredCat?.id === cat.id;

              return (
                <Link
                  key={cat.id}
                  to={`/menu?category=${encodeURIComponent(cat.id)}`}
                  onMouseEnter={() => setHoveredCat(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(1rem, 2.5vw, 1.35rem) 0',
                    borderBottom: '1px solid rgba(23, 23, 23, 0.08)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isHovered ? 'var(--color-yellow)' : 'var(--color-muted)',
                        transition: 'color 0.25s ease',
                        width: '24px',
                        flexShrink: 0
                      }}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.5rem, 5vw, 3.8rem)',
                          lineHeight: 0.92,
                          color: isHovered ? 'var(--color-cobalt)' : 'var(--color-charcoal)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.01em',
                          transition: 'color 0.25s ease'
                        }}
                      >
                        {cat.name}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: 'var(--color-muted)',
                          marginTop: '0.2rem'
                        }}
                      >
                        {cat.tagline} • {cat.count} items
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      borderRadius: '50%',
                      border: `1.5px solid ${isHovered ? 'var(--color-cobalt)' : 'rgba(23, 23, 23, 0.15)'}`,
                      backgroundColor: isHovered ? 'var(--color-cobalt)' : 'transparent',
                      color: isHovered ? 'var(--color-yellow)' : 'var(--color-charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: isHovered ? 'scale(1.1) rotate(45deg)' : 'scale(1) rotate(0deg)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Preview Card: High Impact Editorial Image */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '440px',
              padding: '2rem'
            }}
            className="category-preview-wrap"
          >
            {/* Background Organic Color Orb */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                backgroundColor: 'rgba(247, 203, 40, 0.45)',
                filter: 'blur(30px)',
                zIndex: 1,
                transition: 'all 0.5s ease'
              }}
            />

            {/* Hovered Food Cutout */}
            <div
              key={hoveredCat?.id}
              style={{
                position: 'relative',
                zIndex: 3,
                animation: 'reveal-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <img
                src={hoveredCat?.image}
                alt={hoveredCat?.name}
                style={{
                  maxHeight: '280px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.2))',
                  marginBottom: '1.5rem',
                  transform: 'scale(1.04) rotate(-3deg)',
                  transition: 'transform 0.4s ease'
                }}
              />
              <div
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  padding: '0.75rem 1.75rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-cobalt)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: 'var(--color-cobalt)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {hoveredCat?.name}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--color-muted)'
                  }}
                >
                  CLICK TO VIEW FULL SELECTION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .category-grid {
            grid-template-columns: 1fr !important;
          }
          .category-preview-wrap {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
