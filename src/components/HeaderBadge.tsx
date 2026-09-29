import React from 'react';
import { THEME } from '../theme';

interface HeaderBadgeProps {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badgeColor?: string;
}

export const HeaderBadge: React.FC<HeaderBadgeProps> = ({
  badge,
  title,
  highlightText,
  subtitle,
  align = 'center',
  badgeColor = THEME.mainText,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        maxWidth: '1200px',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {badge && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: THEME.darkBlue,
            border: `1.5px solid ${badgeColor}`,
            borderRadius: '999px',
            padding: '6px 18px',
            marginBottom: '16px',
            boxShadow: `0 4px 16px ${THEME.darkBlueShadow}`,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: THEME.mainText,
              boxShadow: `0 0 8px ${THEME.mainText}`,
            }}
          />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            {badge}
          </span>
        </div>
      )}

      <h1
        style={{
          fontSize: '52px',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          textShadow: `0 4px 20px ${THEME.darkBlueShadow}`,
          margin: 0,
        }}
      >
        {title}{' '}
        {highlightText && (
          <span
            style={{
              color: THEME.mainText,
              textShadow: `0 4px 15px ${THEME.amberGlow}`,
            }}
          >
            {highlightText}
          </span>
        )}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: '20px',
            color: THEME.subText,
            fontWeight: 500,
            marginTop: '12px',
            lineHeight: 1.5,
            maxWidth: '800px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
