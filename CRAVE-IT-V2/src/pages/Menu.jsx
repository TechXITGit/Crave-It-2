import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowUpDown, X, Info, Check, Filter } from 'lucide-react';
import { MENU_DATA, INTERNAL_VERIFICATION_LIST } from '../data/menuData';
import { CATEGORIES } from '../data/categories';
import { FoodCard } from '../components/FoodCard';

export const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'name-asc', 'name-desc'
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Synchronize state with URL search param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MENU_DATA.filter((product) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Search Match
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      // Diet Match
      const matchesDiet =
        dietFilter === 'all' ||
        (dietFilter === 'veg' && product.type === 'veg') ||
        (dietFilter === 'non-veg' && product.type === 'non-veg');

      return matchesCategory && matchesSearch && matchesDiet;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, dietFilter, sortBy]);

  // Current active category object
  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  // Counts for current category view
  const categoryProducts = useMemo(() => {
    return selectedCategory === 'all'
      ? MENU_DATA
      : MENU_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalInCat = categoryProducts.length;
  const vegInCat = categoryProducts.filter((p) => p.type === 'veg').length;
  const nonVegInCat = categoryProducts.filter((p) => p.type === 'non-veg').length;

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
        {/* Top Section — The Crave It Collection */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="editorial-tag" style={{ marginBottom: '1rem' }}>
            THE CRAVE IT COLLECTION
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
            <div>
              <h1 className="section-headline">
                FIND YOUR<br />
                NEXT CRAVING.
              </h1>
            </div>
            <div style={{ maxWidth: '460px' }}>
              <p className="section-subline">
                From smoky kebabs to comforting biryani, there's something for every appetite.
              </p>
              
            </div>
          </div>
        </div>

        {/* Category Navigation Bar — Horizontally Scrollable on Mobile */}
        <div
          style={{
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            scrollbarWidth: 'thin'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              gap: '0.6rem',
              minWidth: 'max-content'
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.35rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isActive ? 'var(--color-cobalt)' : 'var(--color-bg-secondary)',
                    color: isActive ? 'var(--color-white)' : 'var(--color-charcoal)',
                    border: `1.5px solid ${isActive ? 'var(--color-cobalt)' : 'var(--border-subtle)'}`,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 6px 16px -4px rgba(23, 70, 210, 0.35)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(23, 70, 210, 0.08)';
                      e.currentTarget.style.borderColor = 'var(--color-cobalt)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }
                  }}
                >
                  <span>{cat.name}</span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.06)',
                      color: isActive ? 'var(--color-white)' : 'var(--color-muted)'
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter, Search & Dietary Sub-Navigation Bar */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-subtle)',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Top Row: Search Input + Dietary Toggles + Sort */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 300px',
                maxWidth: '460px'
              }}
            >
              <Search
                size={18}
                color="var(--color-cobalt)"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type="text"
                placeholder="Search dishes (e.g. Kathi Roll, Dum Biryani, Momos...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--color-bg-primary)',
                  fontSize: '0.88rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  color: 'var(--color-charcoal)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Prominent Dietary Toggle: [ ALL ] [ VEG ] [ NON-VEG ] with recognizable FSSAI indicators */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-bg-primary)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px',
                  border: '1.5px solid var(--border-subtle)'
                }}
              >
                {/* ALL */}
                <button
                  type="button"
                  onClick={() => setDietFilter('all')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem clamp(0.65rem, 2vw, 1.15rem)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    backgroundColor: dietFilter === 'all' ? 'var(--color-cobalt)' : 'transparent',
                    color: dietFilter === 'all' ? 'var(--color-white)' : 'var(--color-charcoal)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ALL ({totalInCat})
                </button>

                {/* VEG with Green Square Indicator */}
                <button
                  type="button"
                  onClick={() => setDietFilter('veg')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem clamp(0.65rem, 2vw, 1.15rem)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    backgroundColor: dietFilter === 'veg' ? '#2e7d32' : 'transparent',
                    color: dietFilter === 'veg' ? 'var(--color-white)' : 'var(--color-charcoal)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '12px',
                      height: '12px',
                      border: `1.5px solid ${dietFilter === 'veg' ? '#ffffff' : '#2e7d32'}`,
                      borderRadius: '2px',
                      padding: '1px'
                    }}
                  >
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: dietFilter === 'veg' ? '#ffffff' : '#2e7d32'
                      }}
                    />
                  </span>
                  VEG ({vegInCat})
                </button>

                {/* NON-VEG with Red Square Indicator */}
                <button
                  type="button"
                  onClick={() => setDietFilter('non-veg')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem clamp(0.65rem, 2vw, 1.15rem)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    backgroundColor: dietFilter === 'non-veg' ? '#c62828' : 'transparent',
                    color: dietFilter === 'non-veg' ? 'var(--color-white)' : 'var(--color-charcoal)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '12px',
                      height: '12px',
                      border: `1.5px solid ${dietFilter === 'non-veg' ? '#ffffff' : '#c62828'}`,
                      borderRadius: '2px',
                      padding: '1px'
                    }}
                  >
                    <span
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '3px solid transparent',
                        borderRight: '3px solid transparent',
                        borderBottom: `6px solid ${dietFilter === 'non-veg' ? '#ffffff' : '#c62828'}`
                      }}
                    />
                  </span>
                  NON-VEG ({nonVegInCat})
                </button>
              </div>

              {/* Sort Dropdown */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-bg-primary)',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--border-subtle)',
                  padding: '0.45rem 0.9rem'
                }}
              >
                <ArrowUpDown size={14} color="var(--color-cobalt)" style={{ marginRight: '0.4rem' }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--color-charcoal)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Recommended</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Category Meta Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--color-muted)'
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: 'var(--color-cobalt)', textTransform: 'uppercase' }}>
                {currentCategoryObj.name}:
              </span>{' '}
              <span>{currentCategoryObj.tagline || 'Freshly prepared upon your order'}</span>
            </div>

            <div>
              <span>Displaying </span>
              <strong style={{ color: 'var(--color-charcoal)' }}>{filteredProducts.length}</strong>
              <span> of {totalInCat} dishes</span>
              {dietFilter !== 'all' && (
                <span style={{ marginLeft: '0.4rem', color: 'var(--color-cobalt)', fontWeight: 600 }}>
                  ({dietFilter === 'veg' ? 'Veg Only' : 'Non-Veg Only'})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid — 107 Menu Entries */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.25rem, 3vw, 2rem)'
            }}
          >
            {filteredProducts.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              padding: '6rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              maxWidth: '600px',
              margin: '2rem auto'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                color: 'var(--color-cobalt)',
                marginBottom: '0.8rem'
              }}
            >
              NO CRAVING FOUND
            </h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.5 }}>
              No culinary items matched "{searchQuery}" under {currentCategoryObj.name} with dietary filter "{dietFilter}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Internal Verification Modal (Inspect all 5 handwritten menu flags) */}
      {showVerificationModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowVerificationModal(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-cobalt)',
              padding: '2.5rem',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-hover)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span className="editorial-tag" style={{ marginBottom: '0.4rem' }}>
                  QUALITY ASSURANCE & MENU INTEGRITY
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-cobalt)', margin: 0 }}>
                  INTERNAL MENU VERIFICATION LOG
                </h3>
              </div>
              <button
                onClick={() => setShowVerificationModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  color: 'var(--color-charcoal)'
                }}
              >
                <X size={22} />
              </button>
            </div>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              The following dishes transcribed from the restaurant's handwritten documents have specific annotations preserved in code pending owner/chef confirmation:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {INTERNAL_VERIFICATION_LIST.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ color: 'var(--color-cobalt)', fontSize: '0.95rem' }}>
                      {item.dishName}
                    </strong>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(23, 70, 210, 0.1)',
                        color: 'var(--color-cobalt)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-charcoal)', lineHeight: 1.45 }}>
                    {item.issue}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="btn-primary"
              >
                CLOSE LOG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
