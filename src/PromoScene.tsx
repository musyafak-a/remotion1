import React from 'react';
import { AbsoluteFill, Img, Video, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile } from 'remotion';

export const PromoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const phoneSlideUp = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 12,
      stiffness: 90,
    },
  });

  const textOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const textTranslateY = interpolate(frame, [45, 60], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Calculate phone Y offset
  // Start from offscreen (e.g., 1000px down) to centered (0px)
  const phoneY = interpolate(phoneSlideUp, [0, 1], [1000, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background Video */}
      <AbsoluteFill style={{ opacity: 0.15 }}>
        <Video src={staticFile('contoh.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
      </AbsoluteFill>

      {/* Main Content Layout */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '100px', width: '100%', height: '100%', zIndex: 10 }}>
        
        {/* Promotional Text */}
        <div style={{ 
          opacity: textOpacity, 
          transform: `translateY(${textTranslateY}px)`,
          color: 'white',
          fontSize: '72px',
          fontWeight: '800',
          width: '500px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.1,
          textShadow: '0 10px 30px rgba(0,0,0,0.5)',
          background: 'linear-gradient(90deg, #fff, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Transform Your Learning Experience
        </div>

        {/* Smartphone Mockup */}
        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <div style={{
            width: '340px',
            height: '700px',
            backgroundColor: '#000',
            borderRadius: '50px',
            border: '10px solid #1e293b',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 2px #334155 inset',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute',
              top: '-1px',
              width: '140px',
              height: '32px',
              backgroundColor: '#1e293b',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              zIndex: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }} />
            
            {/* Screen Content */}
            <Img 
              src={staticFile('lms-ui.jpg')} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
            />
          </div>
        </div>
        
      </div>
    </AbsoluteFill>
  );
};
