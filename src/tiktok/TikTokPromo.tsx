import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  DollarSign,
  Globe,
  GraduationCap,
  Headphones,
  Laptop,
  LineChart,
  Newspaper,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { MockupLaptop } from '../components/MockupLaptop';
import { MockupPhone } from '../components/MockupPhone';
import { NusatamaLogo } from '../components/NusatamaLogo';
import { THEME } from '../theme';

export const TIKTOK_DURATION = 450; // 15 seconds at 30 FPS

// Color requested for icon backgrounds and designated shapes
const SHAPE_BLUE = '#1d94bf';

// ==========================================
// SHARED FOOTER BAR (White Bar, #1d94bf Icon Circles, Dark Blue Text)
// ==========================================
const NusatamaFooter: React.FC<{
  opacity?: number;
  translateY?: number;
  invisible?: boolean;
}> = ({
  opacity = 1,
  translateY = 0,
  invisible = false,
}) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#ffffff',
        borderRadius: '999px',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: `3px solid ${THEME.mainText}`,
        boxShadow: `0 16px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(255, 255, 255, 0.35)`,
        opacity: invisible ? 0 : opacity,
        visibility: invisible ? 'hidden' : 'visible',
        pointerEvents: invisible ? 'none' : 'auto',
        transform: `translateY(${translateY}px)`,
        zIndex: 50,
      }}
    >
      {/* Phone */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: THEME.darkBlue }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: SHAPE_BLUE,
            border: `2px solid ${THEME.mainText}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Phone size={24} color="#ffffff" />
        </div>
        <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.02em', color: THEME.darkBlue }}>
          0821-3006-6694
        </span>
      </div>

      {/* Website */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: THEME.darkBlue }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: SHAPE_BLUE,
            border: `2px solid ${THEME.mainText}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Globe size={24} color="#ffffff" />
        </div>
        <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.02em', color: THEME.darkBlue }}>
          https://nusatama.co/
        </span>
      </div>

      {/* Instagram */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: THEME.darkBlue }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: SHAPE_BLUE,
            border: `2px solid ${THEME.mainText}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
        <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.02em', color: THEME.darkBlue }}>
          nusatama.co
        </span>
      </div>
    </div>
  );
};

// ==============================================================
// SCENE 1: SAATNYA PUNYA WEBSITE SENDIRI! (0 - 110 frames / 3.6s)
// ==============================================================
const Scene1SaatnyaPunyaWebsite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Springs
  const badgeSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const titleSpring = spring({ frame: frame - 6, fps, config: { damping: 12, stiffness: 90 } });
  const mockupsSpring = spring({ frame: frame - 16, fps, config: { damping: 13, stiffness: 85 } });
  const pillsSpring = spring({ frame: frame - 26, fps, config: { damping: 12, stiffness: 90 } });
  const subSpring = spring({ frame: frame - 32, fps, config: { damping: 12, stiffness: 90 } });

  // Outro transition (extended from 11 to 19 frames with smooth bezier easing)
  const outroSlide = interpolate(frame, [91, 109], [0, -1920], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        transform: `translateY(${outroSlide}px)`,
        overflow: 'hidden',
      }}
    >

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '65px 40px 50px 40px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Header: Nusatama Logo Placeholder (to preserve exact flex layout) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', visibility: 'hidden' }}>
          <NusatamaLogo size="lg" />
        </div>

        {/* Headline block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Badge: WEBSITE E-COURSE (#1d94bf container with gold border & white text) */}
          <div
            style={{
              opacity: badgeSpring,
              transform: `scale(${badgeSpring})`,
              backgroundColor: SHAPE_BLUE,
              border: `2.5px solid ${THEME.mainText}`,
              borderRadius: '999px',
              padding: '12px 42px',
              boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15), 0 0 20px rgba(29, 148, 191, 0.4)`,
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
              }}
            >
              WEBSITE E-COURSE
            </span>
          </div>

          {/* Title 1: SAATNYA PUNYA */}
          <h1
            style={{
              fontSize: '78px',
              fontWeight: 900,
              fontStyle: 'italic',
              color: THEME.darkBlue,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.5)',
              opacity: titleSpring,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
            }}
          >
            SAATNYA PUNYA
          </h1>

          {/* Title 2: WEBSITE SENDIRI! */}
          <h1
            style={{
              fontSize: '86px',
              fontWeight: 900,
              fontStyle: 'italic',
              color: THEME.mainText,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textShadow: `0 4px 22px rgba(11, 37, 58, 0.35)`,
              opacity: titleSpring,
              transform: `scale(${titleSpring})`,
            }}
          >
            WEBSITE SENDIRI!
          </h1>
        </div>

        {/* Center: 2.5D Laptop and Smartphone Mockups (Restored to Sleek Dark Color) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '560px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: mockupsSpring,
            transform: `scale(${mockupsSpring})`,
          }}
        >
          {/* Laptop Mockup (Dark Color) */}
          <div
            style={{
              transform: 'scale(0.96)',
              filter: `drop-shadow(0 30px 50px ${THEME.darkBlueShadow})`,
            }}
          >
            <MockupLaptop width={820} />
          </div>

          {/* Smartphone Mockup (Dark Color) */}
          <div
            style={{
              position: 'absolute',
              right: '25px',
              bottom: '15px',
              transform: 'scale(0.95) rotate(3deg)',
              zIndex: 30,
              filter: `drop-shadow(0 25px 40px ${THEME.darkBlueShadow})`,
            }}
          >
            <MockupPhone width={225} />
          </div>
        </div>

        {/* 4 Feature Cards (White Cards, #1d94bf Icon Box, Dark Blue Text) */}
        <div
          style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            opacity: pillsSpring,
            transform: `translateY(${interpolate(pillsSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          {[
            { label: 'Demo Gratis', icon: Laptop },
            { label: 'Implementasi Mudah', icon: Rocket },
            { label: 'Tim Support Siap Membantu', icon: Headphones },
            { label: 'Aman & Terpercaya', icon: ShieldCheck },
          ].map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '22px',
                  padding: '22px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '12px',
                  boxShadow: `0 12px 28px rgba(0, 0, 0, 0.12)`,
                  border: `3px solid ${THEME.mainText}`,
                }}
              >
                {/* #1d94bf Icon Box with Amber Border */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: SHAPE_BLUE,
                    border: `2px solid ${THEME.mainText}`,
                    boxShadow: '0 4px 12px rgba(29, 148, 191, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={30} color="#ffffff" />
                </div>
                <span
                  style={{
                    fontSize: '21px',
                    fontWeight: 900,
                    color: THEME.darkBlue,
                    lineHeight: 1.25,
                  }}
                >
                  {pill.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subtitle Banner (#1d94bf background shape from Image 3, White Text) */}
        <div
          style={{
            opacity: subSpring,
            transform: `scale(${subSpring})`,
            backgroundColor: SHAPE_BLUE,
            border: `3px solid ${THEME.mainText}`,
            borderRadius: '999px',
            padding: '16px 36px',
            boxShadow: `0 12px 30px rgba(0, 0, 0, 0.15), 0 0 25px rgba(29, 148, 191, 0.4)`,
            maxWidth: '1000px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '27px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.02em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Solusi Digital Pengelolaan Kursus & Pesantren yang Lebih Modern
          </span>
        </div>

        {/* Bottom Footer Bar Placeholder (to preserve exact flex layout) */}
        <NusatamaFooter invisible />
      </div>
    </AbsoluteFill>
  );
};

// ==============================================================
// SCENE 2: KEUNGGULAN YANG ANDA DAPATKAN! (110 - 225 frames / 3.8s)
// ==============================================================
const Scene2Keunggulan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Springs
  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 95 } });
  const k1 = spring({ frame: frame - 10, fps, config: { damping: 11, stiffness: 100 } });
  const k2 = spring({ frame: frame - 18, fps, config: { damping: 11, stiffness: 100 } });
  const k3 = spring({ frame: frame - 26, fps, config: { damping: 11, stiffness: 100 } });
  const k4 = spring({ frame: frame - 34, fps, config: { damping: 11, stiffness: 100 } });
  const k5 = spring({ frame: frame - 42, fps, config: { damping: 11, stiffness: 100 } });
  const laptopSpring = spring({ frame: frame - 48, fps, config: { damping: 13, stiffness: 85 } });

  // Outro transition (extended from 9 to 18 frames with smooth bezier easing)
  const outroSlide = interpolate(frame, [96, 114], [0, -1920], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        transform: `translateY(${outroSlide}px)`,
        overflow: 'hidden',
      }}
    >

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '65px 40px 50px 40px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Header: Nusatama Logo Placeholder (to preserve exact flex layout) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', visibility: 'hidden' }}>
          <NusatamaLogo size="lg" />
        </div>

        {/* Headline block */}
        <div
          style={{
            textAlign: 'center',
            opacity: titleSpring,
            transform: `scale(${titleSpring})`,
          }}
        >
          <h1
            style={{
              fontSize: '70px',
              fontWeight: 900,
              fontStyle: 'italic',
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: THEME.mainText, textShadow: `0 4px 20px rgba(11, 37, 58, 0.35)` }}>
              KEUNGGULAN
            </span>{' '}
            <span style={{ color: THEME.darkBlue, textShadow: '0 2px 10px rgba(255, 255, 255, 0.45)' }}>
              YANG AKAN
            </span>
            <br />
            <span style={{ color: '#ffffff', textShadow: `0 4px 18px rgba(11, 37, 58, 0.35)` }}>
              ANDA DAPATKAN!
            </span>
          </h1>

          {/* Subtitle Badge (#1d94bf Background Shape, White Text) */}
          <div
            style={{
              backgroundColor: SHAPE_BLUE,
              border: `2.5px solid ${THEME.mainText}`,
              borderRadius: '999px',
              padding: '12px 38px',
              marginTop: '14px',
              display: 'inline-block',
              boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(29, 148, 191, 0.4)`,
            }}
          >
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.02em', textShadow: '0 2px 6px rgba(0, 0, 0, 0.25)' }}>
              ✓ Alasan Tepat Memilih Platform Nusatama E-Course
            </span>
          </div>
        </div>

        {/* 5 Keunggulan Cards (White Cards, #1d94bf Icon Box, Dark Blue Text) */}
        <div
          style={{
            width: '100%',
            maxWidth: '980px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignItems: 'center',
          }}
        >
          {/* Row 1: 2 Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%' }}>
            <div
              style={{
                opacity: k1,
                transform: `translateX(${interpolate(k1, [0, 1], [-100, 0])}px)`,
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: `0 12px 28px rgba(0, 0, 0, 0.12)`,
                border: `3px solid ${THEME.mainText}`,
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: SHAPE_BLUE,
                  border: `2.5px solid ${THEME.mainText}`,
                  boxShadow: '0 4px 12px rgba(29, 148, 191, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <DollarSign size={34} color="#ffffff" />
              </div>
              <span style={{ fontSize: '28px', fontWeight: 900, color: THEME.darkBlue, lineHeight: 1.2 }}>
                Biaya Terjangkau
              </span>
            </div>

            <div
              style={{
                opacity: k2,
                transform: `translateX(${interpolate(k2, [0, 1], [100, 0])}px)`,
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: `0 12px 28px rgba(0, 0, 0, 0.12)`,
                border: `3px solid ${THEME.mainText}`,
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: SHAPE_BLUE,
                  border: `2.5px solid ${THEME.mainText}`,
                  boxShadow: '0 4px 12px rgba(29, 148, 191, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Headphones size={34} color="#ffffff" />
              </div>
              <span style={{ fontSize: '27px', fontWeight: 900, color: THEME.darkBlue, lineHeight: 1.2 }}>
                Bantuan IT Cepat & Responsif
              </span>
            </div>
          </div>

          {/* Row 2: 2 Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%' }}>
            <div
              style={{
                opacity: k3,
                transform: `translateX(${interpolate(k3, [0, 1], [-100, 0])}px)`,
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: `0 12px 28px rgba(0, 0, 0, 0.12)`,
                border: `3px solid ${THEME.mainText}`,
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: SHAPE_BLUE,
                  border: `2.5px solid ${THEME.mainText}`,
                  boxShadow: '0 4px 12px rgba(29, 148, 191, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Rocket size={34} color="#ffffff" />
              </div>
              <span style={{ fontSize: '27px', fontWeight: 900, color: THEME.darkBlue, lineHeight: 1.2 }}>
                Fleksibel & Mudah Disesuaikan
              </span>
            </div>

            <div
              style={{
                opacity: k4,
                transform: `translateX(${interpolate(k4, [0, 1], [100, 0])}px)`,
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: `0 12px 28px rgba(0, 0, 0, 0.12)`,
                border: `3px solid ${THEME.mainText}`,
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: SHAPE_BLUE,
                  border: `2.5px solid ${THEME.mainText}`,
                  boxShadow: '0 4px 12px rgba(29, 148, 191, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <BookOpen size={34} color="#ffffff" />
              </div>
              <span style={{ fontSize: '27px', fontWeight: 900, color: THEME.darkBlue, lineHeight: 1.2 }}>
                Mendukung Kurikulum OBE
              </span>
            </div>
          </div>

          {/* Row 3: 1 Centered Card */}
          <div
            style={{
              opacity: k5,
              transform: `scale(${k5})`,
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '24px 48px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              boxShadow: `0 12px 28px rgba(0, 0, 0, 0.12)`,
              border: `3px solid ${THEME.mainText}`,
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                backgroundColor: SHAPE_BLUE,
                border: `2.5px solid ${THEME.mainText}`,
                boxShadow: '0 4px 12px rgba(29, 148, 191, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={34} color="#ffffff" />
            </div>
            <span style={{ fontSize: '29px', fontWeight: 900, color: THEME.darkBlue }}>
              Aman dan Stabil
            </span>
          </div>
        </div>

        {/* Laptop Mockup Display at bottom (Dark Color) */}
        <div
          style={{
            opacity: laptopSpring,
            transform: `translateY(${interpolate(laptopSpring, [0, 1], [100, 0])}px) scale(0.9)`,
            filter: `drop-shadow(0 25px 45px ${THEME.darkBlueShadow})`,
            marginBottom: '-20px',
          }}
        >
          <MockupLaptop width={800} />
        </div>

        {/* Bottom Footer Bar Placeholder (to preserve exact flex layout) */}
        <NusatamaFooter invisible />
      </div>
    </AbsoluteFill>
  );
};

// ==============================================================
// SCENE 3: APA AJA SIH FITUR UTAMA NYA? (225 - 340 frames / 3.8s)
// ==============================================================
const Scene3FiturUtama: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Springs
  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 95 } });
  const f1 = spring({ frame: frame - 8, fps, config: { damping: 11, stiffness: 100 } });
  const f2 = spring({ frame: frame - 16, fps, config: { damping: 11, stiffness: 100 } });
  const f3 = spring({ frame: frame - 24, fps, config: { damping: 11, stiffness: 100 } });
  const f4 = spring({ frame: frame - 32, fps, config: { damping: 11, stiffness: 100 } });
  const f5 = spring({ frame: frame - 40, fps, config: { damping: 11, stiffness: 100 } });

  // Outro transition (extended from 9 to 18 frames with smooth bezier easing)
  const outroSlide = interpolate(frame, [96, 114], [0, -1920], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        transform: `translateY(${outroSlide}px)`,
        overflow: 'hidden',
      }}
    >

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '65px 40px 50px 40px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Header: Nusatama Logo Placeholder (to preserve exact flex layout) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', visibility: 'hidden' }}>
          <NusatamaLogo size="lg" />
        </div>

        {/* Headline (Matching Flyer 3) */}
        <div
          style={{
            textAlign: 'center',
            opacity: titleSpring,
            transform: `scale(${titleSpring})`,
            marginTop: '115px',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: THEME.darkBlue,
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.45)',
            }}
          >
            APA AJA SIH
          </div>
          <div
            style={{
              fontSize: '70px',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: THEME.mainText,
              textShadow: `0 4px 20px rgba(11, 37, 58, 0.35)`,
              marginTop: '4px',
            }}
          >
            FITUR UTAMA NYA?
          </div>

          {/* Subtitle Badge (#1d94bf Background Shape, White Text) */}
          <div
            style={{
              backgroundColor: SHAPE_BLUE,
              border: `2.5px solid ${THEME.mainText}`,
              borderRadius: '999px',
              padding: '12px 40px',
              marginTop: '14px',
              display: 'inline-block',
              boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(29, 148, 191, 0.4)`,
            }}
          >
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.02em', textShadow: '0 2px 6px rgba(0, 0, 0, 0.25)' }}>
              Semua Kebutuhan Lembaga dalam 1 Sistem Terpadu
            </span>
          </div>
        </div>

        {/* 5 Fitur Utama List Cards with #1d94bf Icon Boxes (Matching Image 1) */}
        <div
          style={{
            width: '100%',
            maxWidth: '980px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            margin: 'auto 0',
          }}
        >
          {[
            {
              title: 'Pendaftaran & Manajemen Siswa',
              desc: 'Pendaftaran Online & Kelola Data Siswa',
              icon: Users,
              spring: f1,
            },
            {
              title: 'Portal Akademik & E-Learning',
              desc: 'Kelola Modul & Materi Pembelajaran',
              icon: GraduationCap,
              spring: f2,
            },
            {
              title: 'Manajemen Mentor & Jadwal',
              desc: 'Kelola Data Mentor & Jadwal Mengajar',
              icon: Calendar,
              spring: f3,
            },
            {
              title: 'Sistem Keuangan & Penggajian',
              desc: 'Pantau Arus Kas & Kelola Keuangan Lembaga',
              icon: LineChart,
              spring: f4,
            },
            {
              title: 'Manajemen Konten Website',
              desc: 'Kelola Artikel Berita, SEO & Profil Lembaga',
              icon: Newspaper,
              spring: f5,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  opacity: item.spring,
                  transform: `translateX(${interpolate(item.spring, [0, 1], [-70, 0])}px)`,
                  backgroundColor: '#ffffff',
                  borderRadius: '26px',
                  padding: '24px 34px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '26px',
                  boxShadow: `0 14px 32px rgba(0, 0, 0, 0.12)`,
                  border: `3px solid ${THEME.mainText}`,
                }}
              >
                {/* #1d94bf Icon Container with Amber Border (Exact Match to User Image 1) */}
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '22px',
                    backgroundColor: SHAPE_BLUE,
                    border: `2.5px solid ${THEME.mainText}`,
                    boxShadow: '0 6px 16px rgba(29, 148, 191, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={38} color="#ffffff" />
                </div>

                {/* Text Content: Large Title + Prominent High-Contrast Sub-Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Main Feature Title (Dark Blue) */}
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: THEME.darkBlue,
                      lineHeight: 1.15,
                    }}
                  >
                    {item.title}
                  </div>

                  {/* Sub-Text Highlight (Big, Bold, Dark Blue Text) */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'rgba(29, 148, 191, 0.12)',
                      padding: '8px 22px',
                      borderRadius: '14px',
                      border: '1.5px solid rgba(29, 148, 191, 0.35)',
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: THEME.mainText,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '26px',
                        fontWeight: 900,
                        color: THEME.darkBlue,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Footer Bar Placeholder (to preserve exact flex layout) */}
        <NusatamaFooter invisible />
      </div>
    </AbsoluteFill>
  );
};

// ==============================================================
// SCENE 4: CALL TO ACTION OUTRO (340 - 450 frames / 3.7s)
// ==============================================================
const Scene4Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Springs
  const enterSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const ctaSpring = spring({ frame: frame - 15, fps, config: { damping: 11, stiffness: 100 } });

  // Pulsing scale & glow
  const pulse = Math.sin(frame * 0.16) * 0.05 + 1.0;
  const glow = (Math.sin(frame * 0.16) + 1) * 0.4 + 0.4;

  // Specular shine sweep
  const shineX = interpolate((frame * 4) % 120, [0, 120], [-100, 250]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', overflow: 'hidden' }}>

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '75px 40px 50px 40px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Logo */}
        <div style={{ opacity: enterSpring, transform: `scale(${enterSpring})` }}>
          <NusatamaLogo size="xl" />
        </div>

        {/* Center CTA Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: '960px',
          }}
        >
          {/* Badge (#1d94bf Background Shape from Image 2 top part, White Text) */}
          <div
            style={{
              backgroundColor: SHAPE_BLUE,
              border: `2.5px solid ${THEME.mainText}`,
              borderRadius: '999px',
              padding: '14px 42px',
              marginBottom: '20px',
              boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15), 0 0 20px rgba(29, 148, 191, 0.4)`,
              opacity: enterSpring,
            }}
          >
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 2px 6px rgba(0, 0, 0, 0.25)' }}>
              SOLUSI TERBAIK WEBSITE E-COURSE
            </span>
          </div>

          {/* Big Headline */}
          <h1
            style={{
              fontSize: '76px',
              fontWeight: 900,
              fontStyle: 'italic',
              color: THEME.darkBlue,
              lineHeight: 1.15,
              margin: 0,
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.5)',
              opacity: enterSpring,
            }}
          >
            SAATNYA TRANSFORMASI{' '}
            <span style={{ color: THEME.mainText, textShadow: `0 4px 20px rgba(11, 37, 58, 0.35)` }}>
              DIGITAL!
            </span>
          </h1>

          {/* Sub-Text Box (#1d94bf Background Shape from Image 2 bottom part, White Text) */}
          <div
            style={{
              backgroundColor: SHAPE_BLUE,
              border: `3px solid ${THEME.mainText}`,
              borderRadius: '26px',
              padding: '26px 44px',
              boxShadow: `0 14px 35px rgba(0, 0, 0, 0.15), 0 0 25px rgba(29, 148, 191, 0.4)`,
              marginTop: '26px',
              marginBottom: '40px',
              maxWidth: '940px',
              opacity: enterSpring,
            }}
          >
            <p
              style={{
                fontSize: '32px',
                color: '#ffffff',
                fontWeight: 900,
                margin: 0,
                lineHeight: 1.45,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              Miliki platform e-learning resmi, kelola pendaftaran siswa, modul kursus, dan keuangan secara instan!
            </p>
          </div>

          {/* Giant Pulsing CTA Button in Golden Amber (#fbb351) */}
          <div
            style={{
              opacity: ctaSpring,
              transform: `scale(${ctaSpring * pulse})`,
              position: 'relative',
              width: '100%',
              maxWidth: '760px',
            }}
          >
            {/* Glow Aura */}
            <div
              style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '36px',
                background: `linear-gradient(135deg, ${THEME.mainText} 0%, #f59e0b 50%, #ffffff 100%)`,
                filter: 'blur(30px)',
                opacity: glow,
                zIndex: -1,
              }}
            />

            <div
              style={{
                background: `linear-gradient(135deg, ${THEME.mainText} 0%, #f59e0b 100%)`,
                padding: '30px 56px',
                borderRadius: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                boxShadow: `0 22px 50px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.6)`,
                border: '3px solid #ffffff',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Shine beam sweep */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: `${shineX}%`,
                  width: '95px',
                  height: '200%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
                  transform: 'rotate(25deg)',
                }}
              />
              <Sparkles size={38} color={THEME.darkBlue} />
              <span style={{ fontSize: '36px', fontWeight: 900, color: THEME.darkBlue, letterSpacing: '0.02em' }}>
                Mulai Demo Gratis Sekarang!
              </span>
              <ArrowRight size={38} color={THEME.darkBlue} strokeWidth={3.5} />
            </div>
          </div>

          {/* Trust Value Prop Badges */}
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              opacity: ctaSpring,
            }}
          >
            {[
              'Demo Gratis 100%',
              'Implementasi Mudah & Cepat',
              'Full Support Tim IT',
            ].map((badge, bIdx) => (
              <div
                key={bIdx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '999px',
                  padding: '12px 26px',
                  border: `2px solid ${THEME.mainText}`,
                  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.1)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <CheckCircle2 size={24} color="#10b981" />
                <span style={{ fontSize: '22px', fontWeight: 900, color: THEME.darkBlue }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Bar Placeholder (to preserve exact flex layout) */}
        <NusatamaFooter invisible />
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// MASTER TIKTOK PROMO COMPOSITION (15 SECONDS)
// ==========================================
export const TikTokPromoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Top-Right Logo stays static across Scene 1 and Scene 2 transitions,
  // and slides up only during the final transition (Scene 3 -> Scene 4 at frames 321-339)
  const topLogoSlide = interpolate(frame, [321, 339], [0, -1920], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.bg }}>
      {/* Persistent Static Background Grid & Vignette (Fixed throughout all scenes & transitions) */}
      <BackgroundGrid glowColor={THEME.mainText} glowIntensity={0.28} />

      {/* Scene 1: Saatnya Punya Website Sendiri! (0 - 110 / 3.6s) */}
      <Sequence from={0} durationInFrames={110} name="Scene 1: Saatnya Punya Website">
        <Scene1SaatnyaPunyaWebsite />
      </Sequence>

      {/* Scene 2: Keunggulan yang Anda Dapatkan! (110 - 225 / 3.8s) */}
      <Sequence from={110} durationInFrames={115} name="Scene 2: Keunggulan">
        <Scene2Keunggulan />
      </Sequence>

      {/* Scene 3: Fitur Utama (225 - 340 / 3.8s) */}
      <Sequence from={225} durationInFrames={115} name="Scene 3: Fitur Utama">
        <Scene3FiturUtama />
      </Sequence>

      {/* Scene 4: Outro CTA (340 - 450 / 3.7s) */}
      <Sequence from={340} durationInFrames={110} name="Scene 4: Outro CTA">
        <Scene4Outro />
      </Sequence>

      {/* Persistent Top-Right Logo (Static for Scenes 1-3, slides up during final transition to Scene 4) */}
      {frame < 340 && (
        <div
          style={{
            position: 'absolute',
            top: '65px',
            right: '40px',
            zIndex: 90,
            pointerEvents: 'none',
            transform: `translateY(${topLogoSlide}px)`,
          }}
        >
          <NusatamaLogo size="lg" />
        </div>
      )}

      {/* Persistent Static Footer Bar (Unaffected by scene transitions) */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 40px',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <NusatamaFooter />
      </div>
    </AbsoluteFill>
  );
};
