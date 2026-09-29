import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolateColors,
  random,
} from 'remotion';

export const SearchAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TIMINGS
  const morphDuration = 20; // Frames for morphing text and size
  const phase3Start = 30; // Tags fade in
  const phase4Start = 60; // Bento grid appears

  const morphSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // width of pill starts fit-content to full search bar
  const pillWidth = interpolate(morphSpring, [0, 1], [1400, 1200], {
    extrapolateRight: 'clamp',
  });

  const pillHeight = interpolate(morphSpring, [0, 1], [120, 90], {
    extrapolateRight: 'clamp',
  });

  const pillBg = interpolateColors(morphSpring, [0, 1], ['#FFFFFF', '#FFFFFF']);
  const textColor = interpolateColors(morphSpring, [0, 1], ['#000000', '#9ca3af']);
  const iconOpacity = interpolate(morphSpring, [0, 1], [0, 1]);
  const fontSize = interpolate(morphSpring, [0, 1], [64, 32]);
  
  // Shadows and borders
  const shadowOpacity = interpolate(morphSpring, [0, 1], [0.2, 0.05]);
  const borderOpacity = interpolate(morphSpring, [0, 1], [0, 1]);

  // Text crossfade
  const oldTextOpacity = interpolate(morphSpring, [0, 0.3], [1, 0], { extrapolateRight: 'clamp' });
  const newTextOpacity = interpolate(morphSpring, [0.7, 1], [0, 1], { extrapolateLeft: 'clamp' });

  // Move search bar up to make room for tags and grid
  const moveUpSpring = spring({
    frame: frame - phase3Start,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  
  const searchBarY = interpolate(moveUpSpring, [0, 1], [0, -420]);

  // Camera scroll 1: down to the bottom of the grid
  const phase5Start = 110;
  const scrollSpring1 = spring({
    frame: frame - phase5Start,
    fps,
    config: { damping: 16, stiffness: 70, mass: 1 },
  });
  const scroll1 = interpolate(scrollSpring1, [0, 1], [0, -2000]);

  // Camera scroll 2: down to the Pinterest card
  // Reduced from 200 to 150 to minimize the idle duration
  const phase6Start = 150;
  const scrollSpring2 = spring({
    frame: frame - phase6Start,
    fps,
    config: { damping: 16, stiffness: 70, mass: 1 },
  });
  
  // Pinterest card is placed at +3400 offset. searchBarY is -420.
  // We want its final position to be center (0). So we need total scroll of -2980.
  // scroll1 provides -2000, so scroll2 should provide -980. Let's round to -1000.
  const scroll2 = interpolate(scrollSpring2, [0, 1], [0, -1000]);

  const globalScrollY = scroll1 + scroll2;

  // Tags data
  const tags = ["Ideas", "Creative", "Typography", "Inspiration", "Education", "Trends", "Product"];

  // Bento grid data - 5 columns, 5 cards per column, identical total height
  const colors = ['#fca5a5', '#86efac', '#f9a8d4', '#fde047', '#d1d5db'];
  const columnsCount = 5;
  const cardsPerCol = 5;
  const gap = 32;
  const targetTotalHeight = 2200; // All cards in a column will sum to exactly this height

  const columnsData = new Array(columnsCount).fill(0).map((_, colIndex) => {
    let weights = [];
    let totalWeight = 0;
    // Generate deterministic random weights
    for (let r = 0; r < cardsPerCol; r++) {
      const w = random(`weight-${colIndex}-${r}`) * 2 + 1; // Random value between 1 and 3
      weights.push(w);
      totalWeight += w;
    }

    // Convert weights to actual pixel heights
    const heights = weights.map(w => (w / totalWeight) * targetTotalHeight);

    return heights.map((h, rowIndex) => ({
      h,
      color: colors[(colIndex + rowIndex) % colors.length]
    }));
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        transform: `translateY(${globalScrollY}px)`
      }}>
        {/* Search Bar Container */}
        <div
          style={{
            width: pillWidth,
            height: pillHeight,
            backgroundColor: pillBg,
            borderRadius: 9999,
            position: 'absolute',
            transform: `translateY(${searchBarY}px)`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 64px',
            boxShadow: `0 20px 40px rgba(0,0,0,${shadowOpacity})`,
            border: `1px solid rgba(229, 231, 235, ${borderOpacity})`,
            overflow: 'hidden',
            zIndex: 20
          }}
        >
          <div style={{ position: 'relative', flex: 1, height: '100%' }}>
            {/* Old Text */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#000000',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              opacity: oldTextOpacity
            }}>
              Where do great ideas actually begin?
            </div>
            
            {/* New Text */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: textColor,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: fontSize,
              whiteSpace: 'nowrap',
              opacity: newTextOpacity
            }}>
              Your personal canvas for endless inspiration and curated trends.
            </div>
          </div>
          
          {/* Icons container */}
          <div style={{ display: 'flex', gap: 24, opacity: iconOpacity, alignItems: 'center' }}>
            {/* Close X icon */}
            <div style={{ color: '#9ca3af', fontSize: 40, fontWeight: 'bold', fontFamily: 'sans-serif', cursor: 'pointer' }}>×</div>
            {/* Settings/Filter icon (placeholder using 3 lines) */}
            <div style={{ width: 40, height: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
              <div style={{width: 24, height: 3, backgroundColor: '#9ca3af', borderRadius: 2}} />
              <div style={{width: 32, height: 3, backgroundColor: '#9ca3af', borderRadius: 2}} />
              <div style={{width: 20, height: 3, backgroundColor: '#9ca3af', borderRadius: 2}} />
            </div>
          </div>
        </div>

        {/* Tags Container */}
        {frame >= phase3Start && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              gap: 20,
              transform: `translateY(${searchBarY + 120}px)`,
              zIndex: 15
            }}
          >
            {tags.map((tag, i) => {
              const tagSpring = spring({
                frame: frame - phase3Start - i * 2,
                fps,
                config: { damping: 14, stiffness: 100 },
              });
              const yOffset = interpolate(tagSpring, [0, 1], [30, 0]);

              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: '12px 24px',
                    borderRadius: 9999,
                    fontFamily: '"DM Sans", sans-serif',
                    color: '#4b5563',
                    fontSize: 24,
                    fontWeight: 600,
                    opacity: tagSpring,
                    transform: `translateY(${yOffset}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: '1px solid #e5e7eb'
                  }}
                >
                  {/* Mini thumbnail preview placeholder */}
                  <div style={{ width: 32, height: 32, backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                  {tag}
                </div>
              );
            })}
          </div>
        )}

        {/* Bento Grid */}
        {frame >= phase4Start && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              gap: gap,
              transform: `translateY(${searchBarY + 1380}px)`,
              justifyContent: 'center',
              alignItems: 'flex-start',
              zIndex: 10
            }}
          >
            {columnsData.map((col, colIndex) => {
              const colSpring = spring({
                frame: frame - phase4Start - colIndex * 3,
                fps,
                config: { damping: 13, stiffness: 90 },
              });
              
              const colY = interpolate(colSpring, [0, 1], [200, 0]);

              return (
                <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: gap, opacity: colSpring, transform: `translateY(${colY}px)` }}>
                  {col.map((card, rowIndex) => (
                    <div
                      key={rowIndex}
                      style={{
                        width: 240,
                        height: card.h,
                        backgroundColor: card.color,
                        borderRadius: 32,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Pinterest Post Card */}
        {frame >= phase5Start && (
          <div
            style={{
              position: 'absolute',
              transform: `translateY(${searchBarY + 3400}px)`,
              width: 800,
              backgroundColor: '#FFFFFF',
              borderRadius: 32,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              zIndex: 10
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: '#111111' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 24, fontWeight: 600 }}>2,9rb</span>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></svg>
              </div>
              <div style={{ backgroundColor: '#e60023', color: 'white', padding: '12px 24px', borderRadius: 999, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 20 }}>
                Save
              </div>
            </div>
            
            {/* Video Area */}
            <div style={{ width: '100%', height: 750, backgroundColor: '#333333', borderRadius: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Play Button Triangle */}
              <div style={{ width: 0, height: 0, borderTop: '40px solid transparent', borderBottom: '40px solid transparent', borderLeft: '60px solid rgba(255,255,255,0.4)', marginLeft: 15 }} />
            </div>

            {/* Bottom Text */}
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 22, color: '#333', marginTop: 8 }}>
              <span style={{ color: '#888' }}>after effect edits ... </span>
              <span style={{ fontWeight: 600 }}>Hatsu.</span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
