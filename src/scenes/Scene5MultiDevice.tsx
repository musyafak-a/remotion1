import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  Check,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
  Wifi,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { HeaderBadge } from '../components/HeaderBadge';
import { MockupLaptop } from '../components/MockupLaptop';
import { MockupPhone } from '../components/MockupPhone';
import { MockupTablet } from '../components/MockupTablet';

export const Scene5MultiDevice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // 3-Device staggered entrance springs
  const laptopEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 75 },
  });

  const tabletEntrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 13, stiffness: 80 },
  });

  const phoneEntrance = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 85 },
  });

  // Continuous smooth vertical scrolling inside mockups (Frame 45 to 275)
  const laptopScrollY = interpolate(frame, [45, 260], [0, 90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tabletScrollY = interpolate(frame, [45, 260], [0, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const phoneScrollY = interpolate(frame, [45, 260], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sync wave animation pulse
  const syncPulse = (Math.sin(frame * 0.1) + 1) / 2;

  // Outro transition (Frames 275 - 300)
  const outroScale = interpolate(frame, [275, 300], [1, 1.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const outroOpacity = interpolate(frame, [280, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090d16',
        overflow: 'hidden',
        transform: `scale(${outroScale})`,
        opacity: outroOpacity,
      }}
    >
      <BackgroundGrid glowColor="#0284c7" glowIntensity={0.45} />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '60px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            transform: `translateY(${interpolate(headerSpring, [0, 1], [-30, 0])}px)`,
            opacity: headerSpring,
          }}
        >
          <HeaderBadge
            badge="Fleksibilitas Tanpa Batas"
            badgeColor="#38bdf8"
            title="Akses Mudah di"
            highlightText="Berbagai Perangkat"
            subtitle="Belajar dan mengajar kapan saja, di mana saja. Tampilan responsif optimal di Laptop, Tablet, dan Smartphone."
          />
        </div>

        {/* Sync Status Pill Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(2, 132, 199, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            padding: '6px 18px',
            borderRadius: '999px',
            marginTop: '16px',
            boxShadow: `0 0 25px rgba(2, 132, 199, ${0.2 + syncPulse * 0.3})`,
          }}
        >
          <RefreshCw size={15} color="#38bdf8" style={{ transform: `rotate(${frame * 3}deg)` }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#e0f2fe' }}>
            Sinkronisasi Otomatis Multi-Device Aktif
          </span>
          <Wifi size={14} color="#10b981" />
        </div>

        {/* 3-Device Staggered Mockup Presentation Stage */}
        <div
          style={{
            position: 'relative',
            width: '1500px',
            height: '560px',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          {/* DEVICE 1: LAPTOP (Left Position) */}
          <div
            style={{
              position: 'absolute',
              left: '40px',
              bottom: '10px',
              opacity: interpolate(laptopEntrance, [0, 1], [0, 1]),
              transform: `
                translate3d(${interpolate(laptopEntrance, [0, 1], [-120, 0])}px, ${interpolate(laptopEntrance, [0, 1], [150, 0])}px, 0)
                scale(0.88)
              `,
              zIndex: 15,
            }}
          >
            <MockupLaptop width={860} scrollY={laptopScrollY} />
            <div
              style={{
                position: 'absolute',
                top: '-35px',
                left: '20px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                padding: '6px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              }}
            >
              <Monitor size={15} color="#38bdf8" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Laptop & Komputer (Web)</span>
            </div>
          </div>

          {/* DEVICE 2: TABLET (Center-Right Position) */}
          <div
            style={{
              position: 'absolute',
              right: '280px',
              bottom: '20px',
              opacity: interpolate(tabletEntrance, [0, 1], [0, 1]),
              transform: `
                translate3d(0, ${interpolate(tabletEntrance, [0, 1], [180, 0])}px, 0)
                scale(0.85)
              `,
              zIndex: 20,
            }}
          >
            <MockupTablet width={360} scrollY={tabletScrollY} />
            <div
              style={{
                position: 'absolute',
                top: '-35px',
                left: '20px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                padding: '6px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              }}
            >
              <Tablet size={15} color="#f97316" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Tablet & iPad Layout</span>
            </div>
          </div>

          {/* DEVICE 3: SMARTPHONE (Foreground Right Position) */}
          <div
            style={{
              position: 'absolute',
              right: '80px',
              bottom: '10px',
              opacity: interpolate(phoneEntrance, [0, 1], [0, 1]),
              transform: `
                translate3d(${interpolate(phoneEntrance, [0, 1], [100, 0])}px, ${interpolate(phoneEntrance, [0, 1], [160, 0])}px, 0)
                rotate(-2deg)
                scale(0.92)
              `,
              zIndex: 25,
            }}
          >
            <MockupPhone width={195} scrollY={phoneScrollY} />
            <div
              style={{
                position: 'absolute',
                top: '-35px',
                left: '10px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                padding: '6px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              }}
            >
              <Smartphone size={15} color="#10b981" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Mobile App</span>
            </div>
          </div>
        </div>

        {/* Feature Checkpoints at bottom */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '25px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '10px 30px',
          }}
        >
          {['Offline Learning Mode', 'PWA Ready', 'Kecepatan Muat <1 Detik', 'Notifikasi Push Instan'].map((text, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={12} color="#10b981" strokeWidth={3} />
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
