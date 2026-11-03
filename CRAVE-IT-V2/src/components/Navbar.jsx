import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'COMBOS', path: '/combos' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? 'rgba(242, 240, 237, 0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(23, 70, 210, 0.12)' : '1px solid transparent',
          height: 'var(--header-height)'
        }}
      >
        <div
          className="container-wide"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Left: Brand Identity */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: 'var(--color-cobalt)',
                letterSpacing: '0.04em',
                lineHeight: 1
              }}
            >
              CRAVE IT
            </span>
            
          </Link>

          {/* Center: Swiss Editorial Navigation (Pill Outlines) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `nav-pill ${isActive ? 'active' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Bag Trigger & Minimal Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Bag"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-cobalt)',
                color: 'var(--color-white)',
                fontSize: 'var(--text-tag)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-wider)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-deep-blue)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cobalt)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ShoppingBag size={16} strokeWidth={2.2} />
              <span style={{ display: 'none' }} className="bag-label">BAG</span>
              {totalItemsCount > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--color-yellow)',
                    color: 'var(--color-charcoal)',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Minimal Two-Bar Hamburger (Only visible on Mobile view) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="mobile-hamburger-btn"
              style={{
                width: '42px',
                height: '42px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                borderRadius: '50%',
                border: '1.2px solid var(--border-cobalt)',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {mobileMenuOpen ? (
                <X size={18} color="var(--color-cobalt)" />
              ) : (
                <>
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      backgroundColor: 'var(--color-cobalt)',
                      borderRadius: '1px'
                    }}
                  />
                  <span
                    style={{
                      width: '14px',
                      height: '2px',
                      backgroundColor: 'var(--color-cobalt)',
                      borderRadius: '1px',
                      alignSelf: 'flex-end',
                      marginRight: '11px'
                    }}
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'var(--color-bg-primary)',
            padding: '7rem 2rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'reveal-up 0.3s ease forwards',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: 'var(--color-muted)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.75rem'
              }}
            >
              NAVIGATION DIRECTORY
            </span>
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                  color: 'var(--color-cobalt)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  lineHeight: 1
                }}
              >
                <span>{link.name}</span>
                <span style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--color-muted)'
            }}
          >
            <p><strong>CRAVE IT</strong> — Awadhi Culinary Kitchen</p>
            <p>Power House Chauraha, LDA Colony, Lucknow</p>
            <p>Orders & WhatsApp: +91 99191 21513</p>
          </div>
        </div>
      )}

      <style>{`
        .mobile-hamburger-btn {
          display: flex !important;
        }

        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          .bag-label {
            display: inline !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
