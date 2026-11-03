import React from 'react';

export const Marquee = ({ text, reverse = false }) => {
  const marqueeItems = [
    { text: "GOOD FOOD.", isYellow: false },
    { text: "GOOD MOOD.", isYellow: false },
    { text: "BETTER CRAVINGS.", isYellow: true },
    { text: "AWADHI HERITAGE.", isYellow: false },
    { text: "DUM-PUKHT CRAFT.", isYellow: true },
    { text: "ROYAL FLAVOURS.", isYellow: false },
    { text: "GOOD FOOD.", isYellow: false },
    { text: "GOOD MOOD.", isYellow: false },
    { text: "BETTER CRAVINGS.", isYellow: true },
    { text: "AWADHI HERITAGE.", isYellow: false },
    { text: "DUM-PUKHT CRAFT.", isYellow: true },
    { text: "ROYAL FLAVOURS.", isYellow: false }
  ];

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '1.25rem 0',
        userSelect: 'none'
      }}
    >
      <div
        className="marquee-track"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          gap: '2.5rem'
        }}
      >
        {marqueeItems.concat(marqueeItems).map((item, index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2.5rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: 0.9,
                color: item.isYellow ? 'var(--color-yellow)' : 'var(--color-cobalt)',
                textShadow: item.isYellow ? '0 0 1px rgba(23, 23, 23, 0.4)' : 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.2s ease'
              }}
            >
              {item.text}
            </span>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cobalt)',
                display: 'inline-block'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
