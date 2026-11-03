import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowUpRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FoodCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedPortion, setSelectedPortion] = useState(
    product.halfPrice ? 'half' : 'full'
  );
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Check pricing
  const hasConfiguredPrice = product.price !== null && product.price !== undefined;
  const currentPrice = hasConfiguredPrice
    ? (selectedPortion === 'half' && product.halfPrice ? product.halfPrice : (product.specialPrice || product.fullPrice || product.price))
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedPortion, 1, hasConfiguredPrice ? '' : 'Price pending kitchen confirmation');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? 'var(--shadow-hover)' : 'var(--shadow-subtle)'
      }}
    >
      {/* Top Meta Bar */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Dietary Indicator: Green square for Veg, Red square for Non-Veg */}
            <span
              className={product.type === 'veg' || product.isVeg ? 'badge-veg' : 'badge-non-veg'}
              title={product.type === 'veg' || product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-cobalt)'
              }}
            >
              {product.categoryName || product.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
           
            {product.featured && (
              <span className="badge-tag badge-tag-yellow">
                SIGNATURE
              </span>
            )}
          </div>
        </div>

        {/* Product Image Area: Pure Floating Transparent PNG Cutout */}
        <Link
          to={`/product/${product.id}`}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            margin: '0.5rem 0 1.25rem',
            overflow: 'visible'
          }}
        >
          {/* Subtle Ambient Aura on Hover */}
          <div
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(247, 203, 40, 0.28) 0%, rgba(247, 203, 40, 0) 70%)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1.15)' : 'scale(0.85)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              position: 'relative',
              zIndex: 2,
              maxHeight: '185px',
              maxWidth: '92%',
              objectFit: 'contain',
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease',
              transform: isHovered ? 'scale(1.08) rotate(2deg) translateY(-4px)' : 'scale(1) rotate(0deg) translateY(0)',
              filter: isHovered
                ? 'drop-shadow(0 20px 28px rgba(0, 0, 0, 0.2))'
                : 'drop-shadow(0 12px 18px rgba(0, 0, 0, 0.1))'
            }}
          />
        </Link>

        {/* Dish Title & Description */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
              lineHeight: 0.95,
              color: 'var(--color-cobalt)',
              letterSpacing: '0.01em',
              marginBottom: '0.5rem',
              transition: 'color 0.2s ease'
            }}
          >
            {product.name}
          </h3>
        </Link>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-muted)',
            lineHeight: 1.45,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description || product.desc}
        </p>

        {/* Verification Note if flagged */}
        {product.verificationFlag && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(247, 203, 40, 0.15)',
              border: '1px solid rgba(247, 203, 40, 0.4)',
              marginBottom: '1rem',
              fontSize: '0.68rem',
              color: '#8A6700',
              fontWeight: 600
            }}
          >
            <AlertCircle size={12} />
            <span>Verified from handwritten menu</span>
          </div>
        )}
      </div>

      {/* Portion Switcher & Add To Bag */}
      <div>
        {product.halfPrice && (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-pill)',
              padding: '2px',
              marginBottom: '1rem',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setSelectedPortion('half')}
              style={{
                flex: 1,
                padding: '0.35rem 0',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                backgroundColor: selectedPortion === 'half' ? 'var(--color-cobalt)' : 'transparent',
                color: selectedPortion === 'half' ? 'var(--color-white)' : 'var(--color-charcoal)'
              }}
            >
              Half (₹{product.halfPrice})
            </button>
            <button
              onClick={() => setSelectedPortion('full')}
              style={{
                flex: 1,
                padding: '0.35rem 0',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                backgroundColor: selectedPortion === 'full' ? 'var(--color-cobalt)' : 'transparent',
                color: selectedPortion === 'full' ? 'var(--color-white)' : 'var(--color-charcoal)'
              }}
            >
              Full (₹{product.fullPrice || product.price})
            </button>
          </div>
        )}

        {/* Price & Action Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem'
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)'
              }}
            >
              {hasConfiguredPrice ? (selectedPortion === 'half' ? 'Half Portion' : 'Standard Plate') : 'AUTHENTIC RECIPE'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              {hasConfiguredPrice ? (
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    lineHeight: 1,
                    color: 'var(--color-cobalt)',
                    letterSpacing: '0.02em'
                  }}
                >
                  ₹{currentPrice}
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-cobalt)',
                    backgroundColor: 'rgba(23, 70, 210, 0.08)',
                    padding: '0.25rem 0.55rem',
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  PRICE ON REQUEST
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to Bag`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: justAdded ? '#2e7d32' : 'var(--color-cobalt)',
              color: 'var(--color-white)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              if (!justAdded) e.currentTarget.style.backgroundColor = 'var(--color-deep-blue)';
            }}
            onMouseLeave={(e) => {
              if (!justAdded) e.currentTarget.style.backgroundColor = 'var(--color-cobalt)';
            }}
          >
            {justAdded ? (
              <>
                <Check size={14} strokeWidth={3} />
                ADDED
              </>
            ) : (
              <>
                <Plus size={14} strokeWidth={3} />
                ADD
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
