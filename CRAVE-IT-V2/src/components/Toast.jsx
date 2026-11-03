import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isError = toastMessage.type === 'error';

  return (
    <aside
      aria-label="Notification alert"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-charcoal)',
        border: `1.5px solid ${isSuccess ? 'var(--color-cobalt)' : isError ? '#d32f2f' : 'var(--color-yellow)'}`,
        borderRadius: 'var(--radius-pill)',
        padding: '0.75rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
        animation: 'reveal-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        maxWidth: '90vw'
      }}
    >
      {isSuccess && <CheckCircle2 size={18} color="var(--color-cobalt)" />}
      {isError && <AlertTriangle size={18} color="#d32f2f" />}
      {!isSuccess && !isError && <Info size={18} color="var(--color-yellow)" />}

      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: 600
        }}
      >
        {toastMessage.message}
      </span>
    </aside>
  );
};
