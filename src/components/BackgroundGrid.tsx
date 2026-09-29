import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

interface BackgroundGridProps {
  glowColor?: string;
  glowIntensity?: number;
  showParticles?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  glowColor = THEME.mainText,
  glowIntensity = 0.25,
  showParticles = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle floating ambient motion
  const pulse = Math.sin(frame * 0.05) * 0.08 + 1;
  const gridOffsetY = (frame * 0.3) % 50;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.bg,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Light blue base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: THEME.bgGradient,
        }}
      />

      {/* Graph Paper Grid with thin crisp white lines (50px major, 25px minor) */}
      <div
        style={{
          position: 'absolute',
          inset: '-50px 0 0 0',
          backgroundImage: `
            linear-gradient(to right, ${THEME.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${THEME.gridLine} 1px, transparent 1px),
            linear-gradient(to right, ${THEME.gridLineSubtle} 1px, transparent 1px),
            linear-gradient(to bottom, ${THEME.gridLineSubtle} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
          transform: `translateY(${gridOffsetY}px)`,
          opacity: 0.9,
        }}
      />

      {/* Tertiary Dark Blue vignette in corners */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(11, 37, 58, 0.45) 85%, rgba(8, 28, 44, 0.75) 100%)',
        }}
      />

      {/* Central Soft Warm Glow (#fbb351) */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${pulse})`,
          width: '900px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(251, 179, 81, 0.12) 40%, transparent 70%)`,
          filter: 'blur(90px)',
          opacity: glowIntensity,
        }}
      />

      {/* Floating crisp white & amber educational particles / math dots */}
      {showParticles &&
        [...Array(14)].map((_, i) => {
          const x = (i * 137.5) % 1080;
          const baseY = (i * 153.2) % 1920;
          const speed = 0.25 + (i % 4) * 0.15;
          const y = ((baseY - frame * speed) % 2020 + 2020) % 2020 - 50;
          const size = 3 + (i % 3) * 2;
          const isAmber = i % 2 === 0;
          const opacity = interpolate(
            Math.sin(frame * 0.05 + i),
            [-1, 1],
            [0.2, 0.75]
          );

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                backgroundColor: isAmber ? THEME.mainText : '#ffffff',
                opacity,
                boxShadow: `0 0 ${size * 2}px ${isAmber ? THEME.mainText : '#ffffff'}`,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
