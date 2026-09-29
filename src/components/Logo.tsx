import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { GraduationCap } from 'lucide-react';
import { THEME } from '../theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const frame = useCurrentFrame();

  const config = {
    sm: { iconSize: 28, titleSize: 24, padding: '8px 16px', gap: 10 },
    md: { iconSize: 42, titleSize: 36, padding: '12px 24px', gap: 14 },
    lg: { iconSize: 58, titleSize: 52, padding: '18px 34px', gap: 18 },
    xl: { iconSize: 76, titleSize: 68, padding: '24px 44px', gap: 24 },
  }[size];

  // Continuous shine reflection sweep
  const shineOffset = interpolate((frame * 2) % 120, [0, 120], [-100, 200]);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: `${config.gap}px`,
          position: 'relative',
        }}
      >
        {/* Logo Emblem Icon */}
        <div
          style={{
            position: 'relative',
            width: `${config.iconSize * 1.5}px`,
            height: `${config.iconSize * 1.5}px`,
            borderRadius: `${config.iconSize * 0.4}px`,
            background: `linear-gradient(135deg, ${THEME.darkBlue} 0%, #113c5d 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 12px 30px ${THEME.darkBlueShadow}, inset 0 2px 4px rgba(255, 255, 255, 0.25)`,
            border: `2px solid ${THEME.mainText}`,
            overflow: 'hidden',
          }}
        >
          {/* Shine beam across emblem */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: `${shineOffset}%`,
              width: '60%',
              height: '200%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
            }}
          />
          <GraduationCap size={config.iconSize} color={THEME.mainText} strokeWidth={2.4} />
          {/* Accent Sparkle Dot */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 8px #ffffff',
            }}
          />
        </div>

        {/* Brand Text */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: `${config.titleSize}px`,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                textShadow: `0 4px 16px ${THEME.darkBlueShadow}`,
              }}
            >
              LMS
            </span>
            <span
              style={{
                color: THEME.mainText,
                textShadow: `0 4px 20px ${THEME.amberGlow}`,
                fontWeight: 900,
              }}
            >
              PRO
            </span>
            <div
              style={{
                fontSize: `${config.titleSize * 0.32}px`,
                fontWeight: 800,
                color: THEME.mainText,
                background: THEME.darkBlue,
                border: `1.5px solid ${THEME.mainText}`,
                padding: '3px 10px',
                borderRadius: '999px',
                marginLeft: '6px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: `0 2px 8px ${THEME.darkBlueShadow}`,
              }}
            >
              Enterprise
            </div>
          </div>

          {showTagline && (
            <span
              style={{
                fontSize: `${config.titleSize * 0.36}px`,
                color: '#ffffff',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '6px',
                textShadow: '0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              Next-Gen Learning Platform
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
