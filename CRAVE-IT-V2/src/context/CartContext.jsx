import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'crave_it_v2_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((current) => (current?.id ? null : current));
    }, 3200);
  };

  // Add Item to Cart
  const addToCart = (product, portion = 'full', quantity = 1, notes = '') => {
    const isHalf = portion === 'half' && product.halfPrice;
    const unitPrice = isHalf ? product.halfPrice : (product.specialPrice || product.fullPrice);
    const cartItemId = `${product.id}-${portion}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity
        };
        return newCart;
      } else {
        const newItem = {
          cartItemId,
          id: product.id,
          name: product.name,
          category: product.category,
          portion,
          price: unitPrice,
          originalPrice: product.fullPrice,
          pieces: product.pieces,
          image: product.image,
          isVeg: product.isVeg,
          quantity,
          notes
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${portion.toUpperCase()}) to your bag`);
  };

  // Update Quantity
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove Item
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((i) => i.cartItemId === cartItemId);
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.name} from bag`, 'info');
      }
      return prevCart.filter((item) => item.cartItemId !== cartItemId);
    });
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery: Free if order > ₹499 or if cart is empty
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;

  // Taxes & Restaurant Packaging (5% GST)
  const tax = Math.round(subtotal * 0.05);

  // Discount
  let discount = 0;
  if (appliedCoupon === 'CRAVE99') {
    discount = Math.min(99, Math.round(subtotal * 0.2));
  } else if (appliedCoupon === 'WELCOME50') {
    discount = 50;
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee + tax - discount);

  // Coupon Handler
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CRAVE99' || clean === 'WELCOME50') {
      setAppliedCoupon(clean);
      showToast(`Promo Code ${clean} Applied Successfully!`);
      return { success: true, message: 'Coupon applied!' };
    } else {
      showToast('Invalid Coupon Code', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        tax,
        discount,
        finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
