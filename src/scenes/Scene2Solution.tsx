import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { HeaderBadge } from '../components/HeaderBadge';
import { Logo } from '../components/Logo';
import { MockupLaptop } from '../components/MockupLaptop';
import { MockupPhone } from '../components/MockupPhone';

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Logo Intro (Frame 0 - 60)
  const logoIntroSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  // Phase 2: Morphing from Logo center to Header + Laptop Mockup (Frames 50 - 90)
  const morphProgress = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Header positioning
  const headerOpacity = interpolate(frame, [45, 70], [0, 1], { extrapolateRight: 'clamp' });
  const headerTranslateY = interpolate(morphProgress, [0, 1], [60, 0]);

  // Laptop & Phone Mockups Entrance (Frame 55+)
  const laptopSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 75 },
  });

  const phoneSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12, stiffness: 85 },
  });

  // Floating interactive icon springs (staggered bouncy physics)
  const icon1Spring = spring({ frame: frame - 85, fps, config: { damping: 10, stiffness: 100 } });
  const icon2Spring = spring({ frame: frame - 95, fps, config: { damping: 10, stiffness: 100 } });
  const icon3Spring = spring({ frame: frame - 105, fps, config: { damping: 10, stiffness: 100 } });
  const icon4Spring = spring({ frame: frame - 115, fps, config: { damping: 10, stiffness: 100 } });

  // Floating idle physics
  const float1 = Math.sin(frame * 0.08) * 9;
  const float2 = Math.cos(frame * 0.07) * 8;
  const float3 = Math.sin(frame * 0.09 + 1.5) * 10;
  const float4 = Math.cos(frame * 0.08 + 2.5) * 7;

  // Zoom-in transition towards the end (Frame 270 - 300)
  const zoomTransition = interpolate(frame, [270, 300], [1, 1.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoomOpacity = interpolate(frame, [285, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090d16',
        overflow: 'hidden',
        transform: `scale(${zoomTransition})`,
        opacity: zoomOpacity,
      }}
    >
      <BackgroundGrid glowColor="#0284c7" glowIntensity={0.5} />

      {/* Initial Center Logo Hero (visible during frames 0 - 65, then fades/morphs into top) */}
      {frame < 75 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [50, 70], [1, 0]),
            transform: `scale(${logoIntroSpring})`,
            zIndex: 30,
          }}
        >
          {/* Pulsing Light Glow Behind Logo */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.4) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
          <Logo size="xl" showTagline />
          <div
            style={{
              marginTop: '28px',
              fontSize: '24px',
              fontWeight: 700,
              color: '#94a3b8',
              letterSpacing: '0.04em',
            }}
          >
            Memperkenalkan Solusi Terdepan
          </div>
        </div>
      )}

      {/* Main Content Area after morph */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '60px',
          opacity: headerOpacity,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header Badge */}
        <div style={{ transform: `translateY(${headerTranslateY}px)` }}>
          <HeaderBadge
            badge="Solusi Terpadu"
            badgeColor="#0284c7"
            title="LMS Pro –"
            highlightText="All-in-One Learning Platform"
            subtitle="Platform intuitif yang menyatukan manajemen materi, ujian interaktif, dan analitik performa dalam satu ekosistem modern."
          />
        </div>

        {/* 2.5D Devices Showcase (Laptop + Overlapping Phone) */}
        <div
          style={{
            position: 'relative',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Laptop Mockup */}
          <div
            style={{
              opacity: interpolate(laptopSpring, [0, 1], [0, 1]),
              transform: `
                translateY(${interpolate(laptopSpring, [0, 1], [150, 0])}px)
                scale(${laptopSpring})
              `,
            }}
          >
            <MockupLaptop width={960} />
          </div>

          {/* Overlapping Smartphone Mockup */}
          <div
            style={{
              position: 'absolute',
              right: '-60px',
              bottom: '-30px',
              opacity: interpolate(phoneSpring, [0, 1], [0, 1]),
              transform: `
                translateY(${interpolate(phoneSpring, [0, 1], [120, 0])}px)
                rotate(-4deg)
                scale(${phoneSpring})
              `,
              zIndex: 25,
            }}
          >
            <MockupPhone width={220} />
          </div>

          {/* Floating Icon 1: Rising Analytics (Top Left) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '-140px',
              opacity: interpolate(icon1Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(0, ${float1}px, 0)
                scale(${icon1Spring})
              `,
              backgroundColor: '#0f172a',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(16, 185, 129, 0.25)',
              zIndex: 26,
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={24} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Hasil Ujian</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Naik +94.2%</div>
            </div>
          </div>

          {/* Floating Icon 2: Interactive Modules / Books (Bottom Left) */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '-120px',
              opacity: interpolate(icon2Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(0, ${float2}px, 0)
                scale(${icon2Spring})
              `,
              backgroundColor: '#0f172a',
              border: '2px solid rgba(2, 132, 199, 0.4)',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(2, 132, 199, 0.25)',
              zIndex: 26,
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={24} color="#38bdf8" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Materi Digital</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>100% Terstruktur</div>
            </div>
          </div>

          {/* Floating Icon 3: Badge of Excellence (Top Right) */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '-120px',
              opacity: interpolate(icon3Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(0, ${float3}px, 0)
                scale(${icon3Spring})
              `,
              backgroundColor: '#0f172a',
              border: '2px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(249, 115, 22, 0.25)',
              zIndex: 26,
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Award size={24} color="#f97316" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Sertifikasi Resmi</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Auto-Generated</div>
            </div>
          </div>

          {/* Floating Icon 4: Instant Cloud Sync (Bottom Right, under phone) */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '180px',
              opacity: interpolate(icon4Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(0, ${float4}px, 0)
                scale(${icon4Spring})
              `,
              backgroundColor: '#0f172a',
              border: '2px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.6)',
              zIndex: 27,
            }}
          >
            <CheckCircle2 size={20} color="#38bdf8" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Sinkronisasi Cloud Real-Time</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
