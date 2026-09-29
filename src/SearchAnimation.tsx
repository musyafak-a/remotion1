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

  // Camera scroll down to the bottom
  const phase5Start = 110; // Scroll down starts after grid is visible
  const scrollSpring = spring({
    frame: frame - phase5Start,
    fps,
    config: { damping: 16, stiffness: 70, mass: 1 },
  });
  // Scroll up by ~2000px to see the bottom of the grid
  const globalScrollY = interpolate(scrollSpring, [0, 1], [0, -2000]);

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
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `translateY(${globalScrollY}px)` }}>
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
      </div>
    </AbsoluteFill>
  );
};
