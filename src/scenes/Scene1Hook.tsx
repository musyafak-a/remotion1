import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  FileSpreadsheet,
  FileWarning,
  FolderArchive,
  TrendingDown,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { HeaderBadge } from '../components/HeaderBadge';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations for headline
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const textTranslateY = interpolate(textSpring, [0, 1], [40, 0]);

  // Spring animations for messy scattered elements (staggered)
  const item1Spring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 85 } });
  const item2Spring = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 80 } });
  const item3Spring = spring({ frame: frame - 35, fps, config: { damping: 13, stiffness: 75 } });
  const item4Spring = spring({ frame: frame - 45, fps, config: { damping: 11, stiffness: 90 } });
  const item5Spring = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 85 } });

  // Floating hover wobble after entrance
  const hover1 = Math.sin(frame * 0.08) * 8;
  const hover2 = Math.cos(frame * 0.07) * 9;
  const hover3 = Math.sin(frame * 0.06 + 2) * 7;

  // Graph decline line animation
  const graphProgress = interpolate(frame, [40, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outro transition: smooth wipe transition (frame 265 to 300)
  const wipeProgress = interpolate(frame, [265, 298], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wipeX = interpolate(wipeProgress, [0, 1], [1920, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090d16', overflow: 'hidden' }}>
      <BackgroundGrid glowColor="#ef4444" glowIntensity={0.25} />

      {/* Main Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '100px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <HeaderBadge
            badge="Tantangan Pembelajaran Digital"
            badgeColor="#f97316"
            title="Belajar & Mengajar Online"
            highlightText="Jadi Rumit?"
            subtitle="File materi tercecer di berbagai grup chat, tugas menumpuk tanpa sistem rapi, dan rekap nilai manual yang melelahkan."
          />
        </div>

        {/* Scattered Chaos / Messy Elements Area */}
        <div
          style={{
            position: 'absolute',
            inset: '340px 100px 80px 100px',
            pointerEvents: 'none',
          }}
        >
          {/* Item 1: Cluttered Folders Stack (Left) */}
          <div
            style={{
              position: 'absolute',
              left: '60px',
              top: '40px',
              opacity: interpolate(item1Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(${interpolate(item1Spring, [0, 1], [-200, 0])}px, ${hover1}px, 0)
                rotate(-12deg) scale(${item1Spring})
              `,
              width: '320px',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(239, 68, 68, 0.2)',
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <FolderArchive size={28} color="#f97316" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>Folder_Tugas_Final_v4.zip</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>380 File Berantakan • Tak Terorganisir</div>
              </div>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <AlertTriangle size={13} />
              <span>Penyimpanan Penuh & Tumpang Tindih</span>
            </div>
          </div>

          {/* Item 2: Lost Paper / Ungraded Assignment Card (Left Bottom) */}
          <div
            style={{
              position: 'absolute',
              left: '120px',
              bottom: '20px',
              opacity: interpolate(item2Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(${interpolate(item2Spring, [0, 1], [-180, 0])}px, ${hover2}px, 0)
                rotate(8deg) scale(${item2Spring})
              `,
              width: '290px',
              backgroundColor: '#0f172a',
              borderRadius: '14px',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              boxShadow: '0 18px 36px rgba(0,0,0,0.5)',
              padding: '14px 18px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileWarning size={20} color="#ef4444" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#f87171' }}>Tugas Matematika.pdf</span>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                HILANG
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
              "Pak, saya sudah kirim tugas lewat WhatsApp tapi belum tercatat di rekapan..."
            </p>
          </div>

          {/* Item 3: Declining Student Performance Graph (Center-Right) */}
          <div
            style={{
              position: 'absolute',
              right: '80px',
              top: '20px',
              opacity: interpolate(item3Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(${interpolate(item3Spring, [0, 1], [200, 0])}px, ${hover2}px, 0)
                rotate(-4deg) scale(${item3Spring})
              `,
              width: '420px',
              backgroundColor: '#111827',
              borderRadius: '18px',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 35px rgba(239, 68, 68, 0.25)',
              padding: '22px 24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Statistik Semester
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Tingkat Keaktifan Siswa</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '13px',
                }}
              >
                <TrendingDown size={16} />
                <span>-38.4%</span>
              </div>
            </div>

            {/* Downward SVG Trend Curve */}
            <div style={{ position: 'relative', width: '100%', height: '110px' }}>
              <svg width="100%" height="100%" viewBox="0 0 360 110" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="25" x2="360" y2="25" stroke="#1f2937" strokeDasharray="4 4" />
                <line x1="0" y1="65" x2="360" y2="65" stroke="#1f2937" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="360" y2="100" stroke="#1f2937" />

                {/* Animated Falling Line */}
                <path
                  d="M 10 20 Q 90 25, 170 60 T 350 95"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset={interpolate(graphProgress, [0, 1], [400, 0])}
                />
                {/* Danger Dot at the lowest end */}
                {graphProgress > 0.8 && (
                  <circle cx="350" cy="95" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                )}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
              <span>Minggu 1: 94%</span>
              <span>Minggu 4: 72%</span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>Minggu 8: 55.6%</span>
            </div>
          </div>

          {/* Item 4: Manual Grading Spreadsheet Stress Card (Right Bottom) */}
          <div
            style={{
              position: 'absolute',
              right: '180px',
              bottom: '15px',
              opacity: interpolate(item4Spring, [0, 1], [0, 1]),
              transform: `
                translate3d(${interpolate(item4Spring, [0, 1], [150, 0])}px, ${hover3}px, 0)
                rotate(6deg) scale(${item4Spring})
              `,
              width: '310px',
              backgroundColor: '#1e293b',
              borderRadius: '14px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              padding: '14px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileSpreadsheet size={24} color="#10b981" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>Rekap_Nilai_Manual.xlsx</div>
                <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: 700 }}>Formula Error: 24 Nilai Gagal Hitung</div>
              </div>
            </div>
          </div>

          {/* Item 5: Center Floating Warning Badges */}
          <div
            style={{
              position: 'absolute',
              left: '42%',
              top: '110px',
              opacity: interpolate(item5Spring, [0, 1], [0, 1]),
              transform: `scale(${item5Spring})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                padding: '10px 20px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fca5a5',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
              }}
            >
              <AlertCircle size={18} color="#ef4444" />
              <span>Beban Administrasi Berlebih</span>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                border: '1px solid #f97316',
                padding: '8px 18px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fdba74',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              <Clock size={16} color="#f97316" />
              <span>Waktu Mengajar Terbuang</span>
            </div>
          </div>
        </div>
      </div>

      {/* Outro Wipe Transition Curtain */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${wipeX}px`,
          width: '1920px',
          background: 'linear-gradient(90deg, #0284c7 0%, #0369a1 40%, #0b1120 100%)',
          boxShadow: '-20px 0 60px rgba(2, 132, 199, 0.6)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </AbsoluteFill>
  );
};
