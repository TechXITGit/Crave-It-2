import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: '80vh',
          backgroundColor: 'var(--color-bg-primary)',
          paddingTop: 'calc(var(--header-height) + 4rem)',
          paddingBottom: '8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <img
            src="/images/food/lemon-slice.png"
            alt="Empty Bag"
            style={{ width: '100px', margin: '0 auto 2rem', opacity: 0.85 }}
          />
          <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
            YOUR SELECTIONS
          </span>
          <h1 className="section-headline" style={{ marginBottom: '1rem' }}>
            YOUR BAG IS EMPTY.
          </h1>
          <p className="section-subline" style={{ margin: '0 auto 2.5rem' }}>
            No culinary delights added yet. Explore our authentic Awadhi dum biryanis,
            tandoor-charred kebabs, and handcrafted combos.
          </p>
          <Link to="/menu" className="btn-primary">
            EXPLORE THE MENU
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

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
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
            ORDER REVIEW
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
              YOUR CRAVINGS<br />
              SELECTION.
            </h1>
            <button
              onClick={clearCart}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--color-muted)',
                textTransform: 'uppercase',
                textDecoration: 'underline'
              }}
            >
              CLEAR ENTIRE BAG
            </button>
          </div>
        </div>

        {/* 2-Column Cart Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '3.5rem',
            alignItems: 'flex-start'
          }}
          className="cart-page-grid"
        >
          {/* Left: Cart Items Table/List */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.25rem, 4vw, 2.5rem)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '2rem'
                  }}
                  className="cart-item-row"
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        maxHeight: '75px',
                        maxWidth: '75px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span className={item.isVeg ? 'badge-veg' : 'badge-non-veg'} />
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-cobalt)'
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.75rem',
                        color: 'var(--color-cobalt)',
                        lineHeight: 1,
                        marginBottom: '0.4rem'
                      }}
                    >
                      {item.name}
                    </h3>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                      <span>Portion: <strong>{item.portion.toUpperCase()}</strong></span>
                      {item.notes && <span style={{ marginLeft: '0.5rem' }}>• {item.notes}</span>}
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        color: 'var(--color-charcoal)',
                        marginTop: '0.4rem'
                      }}
                    >
                      ₹{item.price} each
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      backgroundColor: 'var(--color-bg-primary)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      style={{ display: 'flex', alignItems: 'center' }}
                      aria-label="Decrease Quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      style={{ display: 'flex', alignItems: 'center' }}
                      aria-label="Increase Quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Line Total & Remove */}
                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        color: 'var(--color-cobalt)',
                        lineHeight: 1,
                        marginBottom: '0.4rem'
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--color-muted)'
                      }}
                    >
                      <Trash2 size={13} />
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Menu Link */}
            <div style={{ marginTop: '2rem' }}>
              <Link
                to="/menu"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase'
                }}
              >
                <ArrowLeft size={16} />
                CONTINUE BROWSING MENU
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.25rem, 4vw, 2.5rem)',
              border: '1px solid var(--border-subtle)',
              position: 'sticky',
              top: 'calc(var(--header-height) + 2rem)'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.85rem',
                lineHeight: 1
              }}
            >
              SUMMARY & CHARGES
            </h2>

            {/* Coupon Code Section */}
            <form onSubmit={handleApply} style={{ marginBottom: '1.75rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.5rem'
                }}
              >
                HAVE A PROMO CODE?
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. CRAVE99 or WELCOME50"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.65rem 1.25rem',
                    backgroundColor: 'var(--color-cobalt)',
                    color: 'var(--color-white)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}
                >
                  APPLY
                </button>
              </div>

              {appliedCoupon && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.6rem',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    fontSize: '0.75rem',
                    color: '#2e7d32',
                    fontWeight: 700
                  }}
                >
                  <span>✓ {appliedCoupon} applied (-₹{discount})</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{ textDecoration: 'underline', color: 'var(--color-muted)' }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                <span>Delivery Charge</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong style={{ color: '#2e7d32' }}>FREE (Orders &gt; ₹499)</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                <span>Restaurant Packaging & GST (5%)</span>
                <span>₹{tax}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2e7d32', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem'
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  FINAL PAYABLE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: 'var(--color-cobalt)',
                    lineHeight: 1
                  }}
                >
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {cart.some((item) => item.price === null || item.price === undefined) && (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(247, 203, 40, 0.15)',
                  border: '1px solid rgba(247, 203, 40, 0.6)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.8rem',
                  color: '#8A6700',
                  lineHeight: 1.45,
                  fontWeight: 600
                }}
              >
                ⚠️ One or more items in your bag have pending kitchen pricing from the handwritten menu. Checkout is restricted until restaurant owner confirms daily rates.
              </div>
            )}

            {/* Proceed to Checkout CTA */}
            {cart.some((item) => item.price === null || item.price === undefined) ? (
              <button
                type="button"
                onClick={() => alert("Online payment is locked because your order contains dishes with unconfigured pricing from the handwritten menu. Please contact the kitchen at +91 99191 21513 to place your order directly.")}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1.15rem 2rem',
                  justifyContent: 'space-between',
                  backgroundColor: '#7A8AA3',
                  cursor: 'not-allowed'
                }}
              >
                <span>PRICING PENDING (CALL TO ORDER)</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <Link
                to="/checkout"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1.15rem 2rem',
                  justifyContent: 'space-between'
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={18} />
              </Link>
            )}

            {/* Trust reassurance */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.25rem',
                fontSize: '0.72rem',
                color: 'var(--color-muted)',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={16} color="var(--color-cobalt)" />
              <span>Direct Kitchen Packaging • Contactless Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-page-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-item-row {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </div>
  );
};
