import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Flame, Clock, Award, Sparkles, ChefHat } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';

export const About = () => {
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
        {/* Editorial Heading */}
        <div style={{ marginBottom: '5rem' }}>
          <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
            BRAND MANIFESTO
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
              THE ART OF<br />
              SLOW EATING.
            </h1>
            <p className="section-subline">
              Where centuries of royal Awadhi culinary mastery meet the sharp,
              refined discipline of modern Swiss minimalist aesthetics.
            </p>
          </div>
        </div>

        {/* Hero Collage Section */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)',
            marginBottom: '4rem',
            overflow: 'hidden'
          }}
        >
          {/* Large Yellow Orb */}
          <div
            style={{
              position: 'absolute',
              right: '-5%',
              top: '20%',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              backgroundColor: 'rgba(247, 203, 40, 0.45)',
              filter: 'blur(45px)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '4rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 3
            }}
            className="about-hero-grid"
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: 'var(--color-cobalt)',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '1.25rem'
                }}
              >
                "WE DIDN'T INVENT THE BIRYANI. WE SIMPLY HONORED ITS SOUL."
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  color: 'var(--color-charcoal)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem'
                }}
              >
                Originating from the royal bawarchikhanas of Awadh in Lucknow,
                the culinary tradition behind CRAVE IT was built around one sacred rule:
                <strong> patience over haste</strong>.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.7,
                  marginBottom: '2rem'
                }}
              >
                Whether it's our melt-in-the-mouth Galawati kebabs tenderized with raw
                papaya and scented with 160 botanicals, our slow-simmered rich curries,
                or our iconic dum-pukht basmati rice, every bite is an intentional
                homage to craft.
              </p>
              <Link to="/menu" className="btn-primary">
                TASTE OUR CREATIONS
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Collage of Floating Cutouts */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: '380px'
              }}
            >
              <img
                src="/images/food/biryani-plate.png"
                alt="Awadhi Dum Biryani"
                className="animate-float-1"
                style={{
                  maxHeight: '320px',
                  filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.22))'
                }}
              />
              <img
                src="/images/food/lemon-hero.png"
                alt="Lemon Citrus"
                className="animate-float-2"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '15px',
                  width: '120px',
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.18))'
                }}
              />
            </div>
          </div>
        </div>

        {/* Three Core Brand Values */}
        <div style={{ marginBottom: '6rem' }}>
          <span className="editorial-tag" style={{ marginBottom: '1.25rem' }}>
            CULINARY PILLARS
          </span>
          <h2 className="section-headline" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem' }}>
            THE PILLARS OF OUR KITCHEN.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {/* 1 */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-cobalt)',
                  color: 'var(--color-yellow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <Flame size={26} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem'
                }}
              >
                1. DUM-PUKHT DISCIPLINE
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Rice and meats are layered with whole star anise, mace, nutmeg, and
                saffron milk. The heavy handi is sealed airtight with flour dough so
                steam builds up gentle, omnidirectional heat.
              </p>
            </div>

            {/* 2 */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-yellow)',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <ChefHat size={26} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem'
                }}
              >
                2. 160 HERITAGE BOTANICALS
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                From vetiver (khus) and kewra essences to dried rose petals and
                stone flowers (pathar phool), our kebabs achieve ethereal tenderness
                without greasy excess.
              </p>
            </div>

            {/* 3 */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(23, 70, 210, 0.1)',
                  color: 'var(--color-cobalt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <Award size={26} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem'
                }}
              >
                3. THE MODERN MINIMALIST CANVAS
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We believe exceptional food needs no gaudy gimmicks. Clean lines,
                uncompromised ingredients, and modern precision make CRAVE IT a truly
                distinct culinary campaign.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
