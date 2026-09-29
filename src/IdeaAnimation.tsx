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

export const IdeaAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- TIMINGS ---
  const typingDuration = 45; // Frames for text to fully appear
  const scene3Start = 65; // Zoom out starts here

  // --- SCENE 1: Typing Text + Glitch ---
  const fullText = "Where do great ideas actually begin?";
  const charsRevealed = Math.floor(
    interpolate(frame, [0, typingDuration], [0, fullText.length], {
      extrapolateRight: 'clamp',
    })
  );
  const displayedText = fullText.substring(0, charsRevealed);

  // --- CAMERA ZOOM (Scene 3) ---
  const cameraSpring = spring({
    frame: frame - scene3Start,
    fps,
    config: { damping: 15, mass: 1.2 },
  });

  // Background is temporarily WHITE based on user request
  const bgColor = '#FFFFFF'; 

  // Camera zoom-out effect: starts huge at 2.4x, zooms to 1x
  const cameraScale = frame >= scene3Start ? interpolate(cameraSpring, [0, 1], [2.4, 1]) : 2.4;
  
  // The text container gets its white pill background in scene 3
  // Since background is white, we might need a border or shadow for the pill box
  const textBgOpacity = frame >= scene3Start ? interpolate(cameraSpring, [0, 0.2], [0, 1], {
    extrapolateRight: 'clamp',
  }) : 0;

  // Text color remains black if it was transitioning, or we can just make it black
  const textColor = frame >= scene3Start ? interpolateColors(
    cameraSpring,
    [0, 0.2],
    ['#000000', '#000000']
  ) : '#000000'; // Text is black since bg is white

  // --- POSTERS DATA (Temporarily Blank White Cards) ---
  const postersData = [
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 280, height: 420, targetX: -680, targetY: -280, rot: -8 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 240, height: 340, targetX: -380, targetY: 0, rot: -2 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 260, height: 380, targetX: -580, targetY: 320, rot: 15 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 300, height: 400, targetX: -80, targetY: -350, rot: 8 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 240, height: 350, targetX: -250, targetY: 320, rot: -6 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 250, height: 360, targetX: 180, targetY: 350, rot: 5 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 240, height: 340, targetX: 350, targetY: -100, rot: -5 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 280, height: 400, targetX: 650, targetY: -280, rot: 12 
    },
    { 
      bg: '#FFFFFF', 
      content: null, 
      width: 300, height: 420, targetX: 580, targetY: 280, rot: -8 
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, overflow: 'hidden' }}>
      <AbsoluteFill 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center',
          transform: `scale(${cameraScale})`,
          transformOrigin: 'center center'
        }}
      >
          {postersData.map((p, i) => {
            const pSpring = spring({
              frame: frame - scene3Start - i * 1.5,
              fps,
              config: { damping: 14, mass: 0.9, stiffness: 110 },
            });
            const scale = interpolate(pSpring, [0, 1], [0, 1]);
            
            // Fade out posters just before the sequence ends (frame 150)
            const postersOpacity = interpolate(frame, [140, 150], [1, 0], { extrapolateRight: 'clamp' });
            
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: p.width,
                  height: p.height,
                  background: p.bg,
                  transform: `translate(${p.targetX}px, ${p.targetY}px) rotate(${p.rot}deg) scale(${scale})`,
                  opacity: pSpring * postersOpacity,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 24,
                overflow: 'hidden',
                zIndex: 5,
                borderRadius: 8
              }}
            >
              {p.content}
            </div>
          );
        })}

        {/* Text Area Container */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Main Text */}
          <div
            style={{
              backgroundColor: `rgba(255, 255, 255, ${textBgOpacity})`,
              padding: '18px 48px',
              borderRadius: 9999,
              color: textColor,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              boxShadow: textBgOpacity > 0.5 ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
              zIndex: 10,
              whiteSpace: 'nowrap'
            }}
          >
            {displayedText}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

