import React from 'react';
import { Img, staticFile } from 'remotion';

interface NusatamaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightBg?: boolean;
}

export const NusatamaLogo: React.FC<NusatamaLogoProps> = ({
  size = 'md',
  lightBg = true,
}) => {
  const dimensions = {
    sm: { imgHeight: 40, padding: '8px 16px', radius: '20px' },
    md: { imgHeight: 54, padding: '10px 20px', radius: '24px' },
    lg: { imgHeight: 72, padding: '12px 24px', radius: '28px' },
    xl: { imgHeight: 118, padding: '18px 36px', radius: '36px' },
  }[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightBg ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
        padding: dimensions.padding,
        borderRadius: dimensions.radius,
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.16), 0 0 20px rgba(255, 255, 255, 0.4)',
        border: '2.5px solid #ffffff',
      }}
    >
      <Img
        src={staticFile('nusatama-logo.png')}
        style={{
          height: `${dimensions.imgHeight}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
