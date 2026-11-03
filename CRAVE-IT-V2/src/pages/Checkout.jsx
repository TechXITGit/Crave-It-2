import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Banknote, Smartphone, MapPin, Phone, User, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/products';

export const Checkout = () => {
  const { cart, subtotal, deliveryFee, tax, discount, finalTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    pincode: '226012',
    city: 'Lucknow',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cod
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Form Validation
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (paymentMethod === 'upi' && !upiId.trim() && !upiId.includes('@')) {
      errs.upi = 'Please provide a valid UPI ID (e.g. name@okhdfcbank)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const hasUnpricedItems = cart.some((item) => item.price === null || item.price === undefined);
    if (hasUnpricedItems) {
      setErrors((prev) => ({
        ...prev,
        pricing: "Cannot checkout: One or more dishes in your bag have unconfigured pricing from the handwritten menu. Please contact kitchen (+91 99191 21513) to verify pricing."
      }));
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const generatedOrderId = `CRV-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderPayload = {
        orderId: generatedOrderId,
        customer: formData,
        items: cart,
        finalTotal,
        paymentMethod,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setOrderConfirmed(orderPayload);
      clearCart();
      setIsSubmitting(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#1746D2', '#F7CB28', '#F5B91D', '#102D96']
        });
      } catch (err) {
        console.log('Confetti triggered', err);
      }
    }, 1200);
  };

  // If cart is empty and no confirmation modal is open, redirect to menu
  if (cart.length === 0 && !orderConfirmed) {
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-cobalt)' }}>
          NO ACTIVE ORDER
        </h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
          Please add items to your bag before proceeding to checkout.
        </p>
        <Link to="/menu" className="btn-primary">
          EXPLORE MENU
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        paddingTop: 'calc(var(--header-height) + 2.5rem)',
        paddingBottom: '8rem'
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-cobalt)',
              marginBottom: '1.5rem'
            }}
          >
            <ArrowLeft size={16} />
            BACK TO BAG
          </Link>
          <span className="editorial-tag" style={{ display: 'block', marginBottom: '0.75rem' }}>
            FINAL CONFIRMATION
          </span>
          <h1 className="section-headline">
            DELIVERY &<br />
            PAYMENT DETAILS.
          </h1>
        </div>

        {/* 2-Column Split: Form on Left, Order Summary on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '3.5rem',
            alignItems: 'flex-start'
          }}
          className="checkout-split-grid"
        >
          {/* Left: Input Form */}
          <form onSubmit={handlePlaceOrder}>
            {/* 1. Customer Information */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem'
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <User size={22} />
                1. CONTACT & IDENTITY
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-two-col">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Kabir Khan"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${errors.name ? '#d32f2f' : 'var(--border-subtle)'}`,
                      backgroundColor: 'var(--color-bg-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {errors.name && <span style={{ color: '#d32f2f', fontSize: '0.72rem' }}>{errors.name}</span>}
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 9919121513"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${errors.phone ? '#d32f2f' : 'var(--border-subtle)'}`,
                      backgroundColor: 'var(--color-bg-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#d32f2f', fontSize: '0.72rem' }}>{errors.phone}</span>}
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Email Address (For Order Receipt)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. kabir@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem'
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <MapPin size={22} />
                2. DELIVERY LOCATION
              </h2>

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Complete Street Address / House / Flat No. *
                </label>
                <textarea
                  rows={3}
                  name="address"
                  placeholder="House/Flat number, Building name, Sector or Locality"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${errors.address ? '#d32f2f' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
                {errors.address && <span style={{ color: '#d32f2f', fontSize: '0.72rem' }}>{errors.address}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="form-two-col">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Landmark / Nearby Spot
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="e.g. Opposite Shakuntalam Hotel"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--color-bg-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    City / Pin Code
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Lucknow (UP) - 226012"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'rgba(23,23,23,0.04)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      color: 'var(--color-muted)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Special Kitchen / Delivery Notes
                </label>
                <input
                  type="text"
                  name="instructions"
                  placeholder="e.g. Ring doorbell, send extra green onions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    backgroundColor: 'var(--color-bg-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem'
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <CreditCard size={22} />
                3. PAYMENT PREFERENCE (DEMO MODE)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Option: UPI */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'upi' ? 'var(--color-cobalt)' : 'var(--border-subtle)'}`,
                    backgroundColor: paymentMethod === 'upi' ? 'rgba(23, 70, 210, 0.05)' : 'var(--color-bg-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    style={{ marginTop: '0.3rem' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Smartphone size={18} color="var(--color-cobalt)" />
                      <strong style={{ fontSize: '0.95rem' }}>Instant UPI (GPay, PhonePe, Paytm)</strong>
                      <span className="badge-tag badge-tag-yellow">RECOMMENDED</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                      Zero additional processing fee. Direct kitchen confirmation.
                    </p>

                    {paymentMethod === 'upi' && (
                      <div style={{ marginTop: '0.85rem' }}>
                        <input
                          type="text"
                          placeholder="Enter your UPI ID (e.g. mobile@upi)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          style={{
                            width: '100%',
                            maxWidth: '360px',
                            padding: '0.65rem 1rem',
                            borderRadius: 'var(--radius-pill)',
                            border: `1px solid ${errors.upi ? '#d32f2f' : 'var(--border-subtle)'}`,
                            backgroundColor: 'var(--color-bg-primary)',
                            fontSize: '0.85rem',
                            outline: 'none'
                          }}
                        />
                        {errors.upi && <div style={{ color: '#d32f2f', fontSize: '0.72rem', marginTop: '0.2rem' }}>{errors.upi}</div>}
                      </div>
                    )}
                  </div>
                </label>

                {/* Option: Cash on Delivery */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'cod' ? 'var(--color-cobalt)' : 'var(--border-subtle)'}`,
                    backgroundColor: paymentMethod === 'cod' ? 'rgba(23, 70, 210, 0.05)' : 'var(--color-bg-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Banknote size={18} color="var(--color-cobalt)" />
                      <strong style={{ fontSize: '0.95rem' }}>Cash on Delivery</strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                      Pay in cash or scan QR code when your food arrives.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {errors.pricing && (
              <div
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(247, 203, 40, 0.15)',
                  border: '1.5px solid rgba(247, 203, 40, 0.6)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.82rem',
                  color: '#8A6700',
                  lineHeight: 1.5,
                  fontWeight: 600
                }}
              >
                ⚠️ {errors.pricing}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '1.25rem 2rem',
                fontSize: '1rem',
                justifyContent: 'center',
                boxShadow: '0 12px 30px -5px rgba(23, 70, 210, 0.5)'
              }}
            >
              {isSubmitting ? (
                'TRANSMITTING ORDER TO KITCHEN...'
              ) : (
                <>
                  PLACE ORDER NOW • ₹{finalTotal}
                  <CheckCircle2 size={18} />
                </>
              )}
            </button>
          </form>

          {/* Right: Order Summary Sidebar */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              border: '1px solid var(--border-subtle)',
              position: 'sticky',
              top: 'calc(var(--header-height) + 2rem)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.75rem',
                marginBottom: '1.25rem',
                lineHeight: 1
              }}
            >
              ORDER OVERVIEW ({cart.length} ITEMS)
            </h3>

            {/* Items mini list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{item.quantity}x {item.name}</span>
                    <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted)' }}>
                      {item.portion.toUpperCase()}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-cobalt)' }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#2e7d32' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST Tax & Packaging</span>
                <span>₹{tax}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2e7d32', fontWeight: 700 }}>
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
                  paddingTop: '0.85rem',
                  marginTop: '0.25rem'
                }}
              >
                <span style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-charcoal)' }}>TOTAL PAYABLE</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-cobalt)', lineHeight: 1 }}>
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Restaurant Reassurance */}
            <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--color-muted)' }}>
              <p><strong>Prepared by:</strong> The Biryani Heritage Kitchen</p>
              <p>Power House Chauraha, LDA Colony, Lucknow</p>
              <p>Direct Hotline: +91 99191 21513</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {orderConfirmed && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(23, 23, 23, 0.65)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '560px',
              width: '100%',
              padding: '3rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
              border: '2px solid var(--color-cobalt)',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-yellow)',
                color: 'var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <span className="editorial-tag" style={{ marginBottom: '0.5rem' }}>
              ORDER SUCCESSFULLY LOGGED
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: 'var(--color-cobalt)',
                textTransform: 'uppercase',
                lineHeight: 0.95,
                marginBottom: '1rem'
              }}
            >
              YOUR CRAVING IS BEING COOKED!
            </h2>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Thank you, <strong>{orderConfirmed.customer.name}</strong>! Your order{' '}
              <strong style={{ color: 'var(--color-cobalt)' }}>#{orderConfirmed.orderId}</strong>{' '}
              has been relayed to our degh kitchen in Sector G, LDA Colony.
            </p>

            {/* Quick Details Box */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'left',
                fontSize: '0.85rem',
                marginBottom: '2rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>Estimated Delivery</span>
                <strong>30 - 45 Minutes</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>Delivery Address</span>
                <strong>{orderConfirmed.customer.address}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>Total Paid</span>
                <strong style={{ color: 'var(--color-cobalt)' }}>₹{orderConfirmed.finalTotal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-muted)' }}>Payment Mode</span>
                <strong>{orderConfirmed.paymentMethod.toUpperCase()}</strong>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/919919121513?text=Hello%20Crave%20It!%20I%20just%20placed%20order%20%23${orderConfirmed.orderId}%20for%20Rs.${orderConfirmed.finalTotal}.%20Please%20confirm%20my%20delivery!`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ backgroundColor: '#25D366', color: 'white', justifyContent: 'center' }}
              >
                CONFIRM VIA WHATSAPP HOTLINE
              </a>
              <button
                onClick={() => navigate('/')}
                className="btn-outline"
                style={{ justifyContent: 'center' }}
              >
                RETURN TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .checkout-split-grid {
            grid-template-columns: 1fr !important;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
