import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { FoodCard } from '../components/FoodCard';
import { CategorySection } from '../components/CategorySection';
import { CombosSection } from '../components/CombosSection';
import { StorySection } from '../components/StorySection';
import { PromoCta } from '../components/PromoCta';
import { PRODUCTS } from '../data/products';

export const Home = () => {
  // Select actual signature dishes from source website for Section B
  const signatureDishes = PRODUCTS.filter((p) => p.isSignature && p.category !== 'Combo Meals').slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Hero Section — The Primary Visual Centerpiece inspired by Reference */}
      <Hero />

      {/* Section A: Moving Marquee */}
      <Marquee text="GOOD FOOD. GOOD MOOD. BETTER CRAVINGS." />

      {/* Section B: Signature Menu ("THE ART OF EATING.") */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 7rem) 0', backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="container-wide">
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.75rem',
              marginBottom: '3rem'
            }}
          >
            <div>
              <span className="editorial-tag" style={{ marginBottom: '0.75rem' }}>
                SIGNATURE REPERTOIRE
              </span>
              <h2 className="section-headline">
                THE ART<br />
                OF EATING.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', maxWidth: '480px' }}>
              <p className="section-subline">
                Slow-braised meats, fragrant saffron long-grain basmati, and royal
                Awadhi recipes crafted with artisanal patience and precision.
              </p>
              <Link to="/menu" className="btn-outline">
                VIEW ENTIRE MENU
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.25rem, 3vw, 2rem)'
            }}
          >
            {signatureDishes.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section C: Food Categories ("FIND YOUR FOOD MOOD.") */}
      <CategorySection />

      {/* Section D: Combos ("MORE BITES. MORE JOY.") */}
      <CombosSection />

      {/* Section E: Brand Story ("MADE FOR YOUR MOMENTS.") */}
      <StorySection />

      {/* Section F: Promotional CTA */}
      <PromoCta />
    </div>
  );
};
