import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
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

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(23, 23, 23, 0.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: 'var(--color-bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.15)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} color="var(--color-cobalt)" />
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--color-cobalt)',
                letterSpacing: '0.02em',
                lineHeight: 1
              }}
            >
              YOUR CRAVINGS BAG
            </h3>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Bag"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-charcoal)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div
          style={{
            backgroundColor: subtotal >= 499 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(23, 70, 210, 0.08)',
            padding: '0.65rem 2rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: subtotal >= 499 ? '#2e7d32' : 'var(--color-cobalt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {subtotal >= 499 ? (
            <span>🎉 You have unlocked <strong>FREE DELIVERY</strong>!</span>
          ) : (
            <span>Add ₹{499 - subtotal} more for <strong>FREE DELIVERY</strong></span>
          )}
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '3rem 1rem'
              }}
            >
              <img
                src="/images/food/lemon-slice.png"
                alt="Empty bag"
                style={{ width: '80px', marginBottom: '1.5rem', opacity: 0.8 }}
              />
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--color-cobalt)',
                  marginBottom: '0.5rem'
                }}
              >
                YOUR BAG IS EMPTY
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  maxWidth: '240px',
                  marginBottom: '1.75rem'
                }}
              >
                Treat yourself to slow-cooked Awadhi Biryani or melt-in-mouth Galawati kebabs.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                EXPLORE MENU
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  alignItems: 'center'
                }}
              >
                {/* Item Thumbnail */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-bg-secondary)',
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
                      maxHeight: '52px',
                      maxWidth: '52px',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h5
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        color: 'var(--color-cobalt)',
                        lineHeight: 1
                      }}
                    >
                      {item.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{ color: 'var(--color-muted)', padding: '2px' }}
                      title="Remove Item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--color-muted)',
                      marginTop: '0.2rem'
                    }}
                  >
                    {item.portion.toUpperCase()} • {item.price !== null && item.price !== undefined ? `₹${item.price} each` : 'Price on Request'}
                  </span>

                  {/* Quantity & Subtotal Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.65rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-pill)',
                        padding: '2px 8px',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={13} />
                      </button>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          minWidth: '16px',
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.3rem',
                        color: 'var(--color-cobalt)'
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.5rem 2rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Promo code (e.g. CRAVE99)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.85rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.55rem 1.15rem',
                    backgroundColor: 'var(--color-cobalt)',
                    color: 'var(--color-white)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
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
                    marginTop: '0.4rem',
                    fontSize: '0.72rem',
                    color: '#2e7d32',
                    fontWeight: 600
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

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#2e7d32' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>Taxes (5% GST)</span>
                <span>₹{tax}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2e7d32', fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.65rem',
                  marginTop: '0.2rem'
                }}
              >
                <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>Total</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    color: 'var(--color-cobalt)',
                    lineHeight: 1
                  }}
                >
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="btn-outline"
                style={{ flex: 1, textAlign: 'center' }}
              >
                VIEW CART
              </Link>
              {cart.some((item) => item.price === null || item.price === undefined) ? (
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary"
                  style={{ flex: 1, textAlign: 'center', backgroundColor: '#7A8AA3' }}
                >
                  REVIEW PRICING
                </Link>
              ) : (
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  CHECKOUT
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
