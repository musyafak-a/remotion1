import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  ArrowRight,
  CheckCircle,
  Globe,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { Logo } from '../components/Logo';

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for logo & headline
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // CTA button pop entrance spring
  const ctaSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 11, stiffness: 95 },
  });

  // Footer bar entrance spring
  const footerSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 13, stiffness: 85 },
  });

  // Pulsing scale & glow effect on the CTA button
  const pulse = Math.sin(frame * 0.12) * 0.035 + 1.0;
  const glowIntensity = (Math.sin(frame * 0.12) + 1) * 0.35 + 0.45;

  // Specular shine sweep across button
  const buttonShine = interpolate((frame * 2.5) % 150, [0, 150], [-100, 250]);

  // Outro final fade-out (Frames 270 - 300)
  const finalFade = interpolate(frame, [270, 298], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090d16',
        overflow: 'hidden',
        opacity: finalFade,
      }}
    >
      <BackgroundGrid glowColor="#0284c7" glowIntensity={0.55} />

      {/* Center Spotlight radial glow directly under CTA */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.28) 0%, rgba(2, 132, 199, 0.18) 50%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '80px',
          paddingBottom: '50px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top: Official Logo */}
        <div
          style={{
            opacity: enterSpring,
            transform: `translateY(${interpolate(enterSpring, [0, 1], [-40, 0])}px)`,
          }}
        >
          <Logo size="lg" showTagline />
        </div>

        {/* Center: Main Headline & Pulsing CTA Button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1100px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              textShadow: '0 10px 40px rgba(0,0,0,0.6)',
              margin: 0,
              opacity: enterSpring,
              transform: `scale(${interpolate(enterSpring, [0, 1], [0.92, 1])})`,
            }}
          >
            Waktunya{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 45%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Bertransformasi!
            </span>
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              fontWeight: 500,
              marginTop: '14px',
              marginBottom: '36px',
              maxWidth: '850px',
              lineHeight: 1.5,
              opacity: enterSpring,
            }}
          >
            Modernisasi proses belajar & mengajar institusi Anda dengan platform LMS terlengkap, tercepat, dan termudah.
          </p>

          {/* Prominent CTA Button with Pulsing Glow */}
          <div
            style={{
              opacity: ctaSpring,
              transform: `scale(${ctaSpring * pulse})`,
              position: 'relative',
            }}
          >
            {/* Ambient Button Aura Glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #0284c7 100%)',
                filter: 'blur(20px)',
                opacity: glowIntensity,
                zIndex: -1,
              }}
            />

            {/* Button Core */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                padding: '22px 56px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 20px 40px rgba(234, 88, 12, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Shine beam sweep */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: `${buttonShine}%`,
                  width: '60px',
                  height: '200%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                  transform: 'rotate(25deg)',
                  pointerEvents: 'none',
                }}
              />

              <Sparkles size={26} color="#ffffff" />
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                Coba Gratis Sekarang
              </span>
              <ArrowRight size={26} color="#ffffff" strokeWidth={3} />
            </div>
          </div>

          {/* Value Badges */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '24px',
              opacity: ctaSpring,
            }}
          >
            {['Gratis Uji Coba 30 Hari', 'Tanpa Kartu Kredit', 'Setup Instan 5 Menit'].map((badge, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
                <CheckCircle size={15} color="#10b981" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Website URL, Demo Contact, Social Media */}
        <div
          style={{
            width: '1240px',
            opacity: footerSpring,
            transform: `translateY(${interpolate(footerSpring, [0, 1], [40, 0])}px)`,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #334155',
            padding: '18px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Website URL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(2, 132, 199, 0.15)',
              border: '1px solid rgba(2, 132, 199, 0.4)',
              padding: '10px 20px',
              borderRadius: '12px',
            }}
          >
            <Globe size={20} color="#38bdf8" />
            <span
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              www.website-lms.com
            </span>
          </div>

          {/* Contact Demo Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneCall size={18} color="#f97316" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Hubungi Tim Konsultan Kami:</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f97316' }}>Hubungi Kami untuk Demo</div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* WhatsApp */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22c55e',
              }}
              title="WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </div>

            {/* Instagram */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f43f5e',
              }}
              title="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>

            {/* YouTube */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
              }}
              title="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>

            {/* LinkedIn */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
              title="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
