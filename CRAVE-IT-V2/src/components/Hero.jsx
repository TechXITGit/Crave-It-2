import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import '../styles/hero.css';

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState(1);

  // Gentle mouse parallax calculation
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Automatic subtle slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev % 3) + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>
      <div className="container-wide" style={{ width: '100%' }}>
        {/* Main 2-Sided Editorial Grid */}
        <div className="hero-main-grid">
          {/* =================================================================
              LEFT COLUMN: Giant Condensed Cobalt Typography & Floating Lemon
             ================================================================= */}
          <div className="hero-left-col">
            {/* Editorial Top Tag with Hairline */}
            <div className="hero-tag-top">
              <span className="editorial-tag">
                SMALL MOMENTS MAKE A BIG APPETITE
              </span>
            </div>

            {/* Giant Asymmetric Typography Block */}
            <div className="hero-type-block">
              {/* Large Yellow Watercolor Orb Behind Letters */}
              <div
                className="hero-left-yellow-orb animate-pulse-subtle"
                style={{
                  transform: `translate(calc(-30% + ${mousePos.x * 12}px), calc(-20% + ${mousePos.y * 12}px))`
                }}
              />


              {/* Main Brand Typography: CRAVE IT with Custom Editorial Tall Letterforms */}
              <div className="hero-letters-wrap">
                <div className="hero-row-1">
                  <span className="letter-condensed">T</span>
                  <span className="letter-condensed">A</span>
                  <span className="letter-condensed">S</span>
                  <span className="letter-condensed">T</span>
                  <span className="letter-condensed">E</span>
                </div>
                <div className="hero-row-2">
                  <span className="letter-condensed">T</span>
                  <span className="letter-condensed">H</span>
                  <span className="letter-condensed">E</span>
                  <span className="letter-condensed"> &nbsp;</span>
                  <span className="letter-condensed letter-special">
                    B
                    
                  </span>
                  <span className="letter-condensed letter-special">
                    I
                    
                  </span>
                  <span className="letter-condensed letter-special">
                    T
                   
                  </span>
                  <span className="letter-condensed letter-special">
                    E
                    <span className="letter-accent-dot" />
                  </span>
                </div>
              </div>

              {/* Large Photorealistic Meyer Lemon Floating in Foreground */}
              <div
                className="floating-lemon-hero animate-float-1"
                style={{
                  transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 28}px) rotate(${mousePos.x * 8}deg)`
                }}
              >
                <img
                  src="/images/food/lemon-hero.png"
                  alt="Floating Meyer Lemon"
                  style={{ width: '100%', height: 'auto', userSelect: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: Vertical Blue Bars + Yellow Orb + Floating Delicacies
             ================================================================= */}
          <div className="hero-right-col">
            {/* Center-Right Editorial Caption Box */}
            <div className="hero-caption-box">
              <p className="hero-caption-text">
                A TASTE OF JOY.<br />
                A BRIGHTER<br />
                FOOD EXPERIENCE.
              </p>
              <Link
                to="/menu"
                className="btn-circle-arrow"
                aria-label="Explore Menu"
                title="Explore the Menu"
              >
                <ArrowUpRight size={22} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Graphic Art Composition: Yellow Sphere + 4 Cobalt Vertical Bars */}
            <div className="hero-graphic-art-wrap">
              {/* Yellow Textured Orb (Right) */}
              <div
                className="hero-right-yellow-orb"
                style={{
                  transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
                }}
              />

              {/* 4 Staggered Cobalt Blue Vertical Graphic Bars (Directly from Reference) */}
              <div
                className="hero-blue-bars"
                style={{
                  transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`
                }}
              >
                <div className="blue-bar blue-bar-1" />
                <div className="blue-bar blue-bar-2" />
                <div className="blue-bar blue-bar-3" />
                <div className="blue-bar blue-bar-4" />
              </div>


              {/* Floating Golden Roasted Chicken Drumstick Cutout */}
              <div
                className="floating-drumstick-right animate-float-2"
                style={{
                  transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px) rotate(${mousePos.x * -10 - 15}deg)`
                }}
              >
                <img
                  src="/images/food/chicken-drumstick.png"
                  alt="Golden Tandoori Drumstick"
                  style={{ width: '100%', height: 'auto', userSelect: 'none' }}
                />
              </div>

              {/* Floating Round Awadhi Biryani Serving Plate */}
              <div
                className="floating-biryani-plate-right animate-float-3"
                style={{
                  transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 18}px) rotate(${mousePos.y * 6}deg)`
                }}
              >
                <img
                  src="/images/food/biryani-plate.png"
                  alt="Authentic Awadhi Biryani"
                  style={{ width: '100%', height: 'auto', userSelect: 'none' }}
                />
              </div>

              {/* Floating Fresh Chili */}
              <div
                className="floating-chilli-right animate-float-1"
                style={{
                  transform: `translate(${mousePos.x * -14}px, ${mousePos.y * -14}px) rotate(${mousePos.y * 15}deg)`
                }}
              >
                <img
                  src="/images/food/red-chilli.png"
                  alt="Red Chili Accent"
                  style={{ width: '100%', height: 'auto', userSelect: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            BOTTOM BAR: Brand Statement & Minimal Slide Progress Indicator
           ================================================================= */}
        <div className="hero-bottom-bar">
          {/* Bottom-Left Brand Statement (Reference Inspired) */}
          <div className="brand-statement-vertical">
            EAT.<br />
            CREATE.<br />
            REPEAT.
          </div>

          {/* Quick Action Pill */}
          <div className="hero-bottom-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/menu" className="btn-primary">
              EXPLORE THE MENU
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/combos" className="btn-outline">
              SPECIAL COMBOS
            </Link>
          </div>

          {/* Bottom-Right Slide Indicator & Progress Line */}
          <div className="slide-indicator">
            <span style={{ opacity: activeSlide === 1 ? 1 : 0.4 }}>0{activeSlide}</span>
            <div
              className="slide-indicator-line"
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--color-yellow)',
                  transform: `scaleX(${activeSlide / 3})`,
                  transformOrigin: 'left',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>
            <span style={{ opacity: 0.4 }}>03</span>
          </div>
        </div>
      </div>
    </section>
  );
};
