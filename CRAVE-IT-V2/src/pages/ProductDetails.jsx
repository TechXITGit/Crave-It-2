import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, Clock, Flame, AlertCircle, ShoppingBag } from 'lucide-react';
import { MENU_DATA } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { FoodCard } from '../components/FoodCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const product = MENU_DATA.find((p) => p.id === id || String(p.id) === String(id));

  // If not found fallback
  if (!product) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 'var(--header-height)'
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-cobalt)' }}>
          DISH NOT FOUND
        </h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
          The requested dish could not be located in our 107-item menu.
        </p>
        <Link to="/menu" className="btn-primary">
          BACK TO MENU
        </Link>
      </div>
    );
  }

  // Variant State for Dry / Gravy
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? product.variants[0] : null);

  // Portion State
  const hasHalf = Boolean(product.halfPrice);
  const [portion, setPortion] = useState(hasHalf ? 'half' : 'full');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Pricing Logic
  const hasConfiguredPrice = product.price !== null && product.price !== undefined;
  const unitPrice = hasConfiguredPrice
    ? (portion === 'half' && product.halfPrice ? product.halfPrice : (product.specialPrice || product.fullPrice || product.price))
    : null;

  const handleAddToCart = () => {
    const customNotes = [
      selectedVariant ? `Preparation: ${selectedVariant}` : '',
      !hasConfiguredPrice ? 'Price on request' : ''
    ].filter(Boolean).join(' • ');

    addToCart(
      {
        ...product,
        price: unitPrice,
        fullPrice: unitPrice
      },
      portion,
      quantity,
      customNotes
    );

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setIsCartOpen(true);
    }, 600);
  };

  // Related dishes in same category
  const relatedDishes = MENU_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        paddingTop: 'calc(var(--header-height) + 2rem)',
        paddingBottom: '8rem'
      }}
    >
      <div className="container-wide">
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '2.5rem' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-cobalt)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transition: 'transform 0.2s ease',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Collection</span>
          </button>
        </div>

        {/* Main Product Showcase: 2-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
            marginBottom: '4rem'
          }}
        >
          {/* Left: Pure Floating Transparent PNG Cutout */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'clamp(280px, 40vw, 440px)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Background Glow */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(247, 203, 40, 0.35) 0%, rgba(247, 203, 40, 0) 70%)',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'relative',
                zIndex: 2,
                maxHeight: '380px',
                maxWidth: '92%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 24px 36px rgba(0, 0, 0, 0.18))',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06) rotate(2deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            />
          </div>

          {/* Right: Editorial Typography & Product Details */}
          <div>
            {/* Diet & Category Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span
                  className={product.type === 'veg' || product.isVeg ? 'badge-veg' : 'badge-non-veg'}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: product.type === 'veg' || product.isVeg ? '#2e7d32' : '#c62828'
                  }}
                >
                  {product.type === 'veg' || product.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                </span>
              </div>

              <span style={{ color: 'var(--border-subtle)' }}>•</span>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cobalt)'
                }}
              >
                {product.categoryName || product.category}
              </span>

              {product.featured && (
                <span className="badge-tag badge-tag-yellow">
                  SIGNATURE
                </span>
              )}
            </div>

            {/* Dish Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
                lineHeight: 0.9,
                color: 'var(--color-cobalt)',
                marginBottom: '1.25rem'
              }}
            >
              {product.name}
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-charcoal)',
                marginBottom: '1.75rem',
                maxWidth: '540px'
              }}
            >
              {product.description || product.desc}
            </p>

            {/* Verification Note (if flagged in handwritten menu) */}
            {product.verificationFlag && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.85rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(247, 203, 40, 0.15)',
                  border: '1px solid rgba(247, 203, 40, 0.5)',
                  marginBottom: '2rem',
                  maxWidth: '540px'
                }}
              >
                <AlertCircle size={18} color="#8A6700" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.78rem', color: '#8A6700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Handwritten Menu Note:
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#5A4300', lineHeight: 1.4 }}>
                    {product.verificationFlag}
                  </span>
                </div>
              </div>
            )}

            {/* Variant Selection for Chinese dishes (Dry vs Gravy) */}
            {hasVariants && (
              <div style={{ marginBottom: '2rem' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-cobalt)',
                    marginBottom: '0.65rem'
                  }}
                >
                  SELECT PREPARATION VARIANT (CONFIRMED ON HANDWRITTEN MENU):
                </span>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.65rem 1.5rem',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: isSelected ? 'var(--color-cobalt)' : 'var(--color-bg-secondary)',
                          color: isSelected ? 'var(--color-white)' : 'var(--color-charcoal)',
                          border: `1.5px solid ${isSelected ? 'var(--color-cobalt)' : 'var(--border-subtle)'}`,
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{v}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Portion Selection (if half/full available) */}
            {hasHalf && (
              <div style={{ marginBottom: '2rem' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-cobalt)',
                    marginBottom: '0.65rem'
                  }}
                >
                  PORTION SIZE:
                </span>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['half', 'full'].map((p) => {
                    const isSelected = portion === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPortion(p)}
                        style={{
                          padding: '0.55rem 1.35rem',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: isSelected ? 'var(--color-cobalt)' : 'var(--color-bg-secondary)',
                          color: isSelected ? 'var(--color-white)' : 'var(--color-charcoal)',
                          border: `1.5px solid ${isSelected ? 'var(--color-cobalt)' : 'var(--border-subtle)'}`,
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                      >
                        {p === 'half' ? `HALF (₹${product.halfPrice})` : `FULL (₹${product.fullPrice || product.price})`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing Area */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem',
                maxWidth: '540px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-muted)'
                  }}
                >
                  PRICE CONFIGURATION
                </span>
                {hasConfiguredPrice ? (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      lineHeight: 1,
                      color: 'var(--color-cobalt)'
                    }}
                  >
                    ₹{unitPrice * quantity}
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
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    PRICE ON REQUEST
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>
                {hasConfiguredPrice
                  ? `Calculated for ${quantity} portion(s). Desi ghee & fresh kitchen ingredients.`
                  : 'The handwritten restaurant document lists this dish without a fixed retail price. Contact kitchen (+91 99191 21513) for daily rate.'}
              </p>
            </div>

            {/* Quantity & Add to Cart Controls */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              {/* Quantity Counter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--border-subtle)',
                  padding: '3px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--color-charcoal)',
                    cursor: 'pointer'
                  }}
                >
                  <Minus size={16} />
                </button>
                <span
                  style={{
                    minWidth: '36px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--color-cobalt)'
                  }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--color-charcoal)',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add To Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.95rem 2.2rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: addedSuccess ? '#2e7d32' : 'var(--color-cobalt)',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 8px 24px -6px rgba(23, 70, 210, 0.4)'
                }}
                onMouseEnter={(e) => {
                  if (!addedSuccess) e.currentTarget.style.backgroundColor = 'var(--color-deep-blue)';
                }}
                onMouseLeave={(e) => {
                  if (!addedSuccess) e.currentTarget.style.backgroundColor = 'var(--color-cobalt)';
                }}
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} strokeWidth={3} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Dishes in Category */}
        {relatedDishes.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '4rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="editorial-tag" style={{ marginBottom: '0.5rem' }}>
                EXPLORE MORE IN {product.categoryName ? product.categoryName.toUpperCase() : product.category.toUpperCase()}
              </span>
              <h2 className="section-headline">
                MORE FROM THIS SECTION.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1.25rem, 3vw, 2rem)'
              }}
            >
              {relatedDishes.map((item) => (
                <FoodCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
