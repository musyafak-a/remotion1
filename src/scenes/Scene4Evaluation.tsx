import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  Award,
  FileCheck2,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { HeaderBadge } from '../components/HeaderBadge';

export const Scene4Evaluation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Chat message springs (staggered)
  const chat1Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 90 } });
  const chat2Spring = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 90 } });
  const chat3Spring = spring({ frame: frame - 90, fps, config: { damping: 12, stiffness: 90 } });

  // Pop-up notification springs (staggered with punchy bounce)
  const notif1Spring = spring({ frame: frame - 35, fps, config: { damping: 10, stiffness: 110 } });
  const notif2Spring = spring({ frame: frame - 95, fps, config: { damping: 10, stiffness: 110 } });
  const notif3Spring = spring({ frame: frame - 155, fps, config: { damping: 10, stiffness: 110 } });

  // Bar chart growth springs (staggered growth from bottom)
  const bar1Spring = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 70 } });
  const bar2Spring = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 70 } });
  const bar3Spring = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 70 } });
  const bar4Spring = spring({ frame: frame - 70, fps, config: { damping: 14, stiffness: 70 } });
  const bar5Spring = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 70 } });

  // Real-time counter interpolation for average grade (0 to 94.8)
  const scoreCounter = interpolate(frame, [40, 110], [0, 94.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outro transition (Frames 275 - 300)
  const outroSlide = interpolate(frame, [275, 300], [0, -80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const outroOpacity = interpolate(frame, [275, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090d16',
        overflow: 'hidden',
        opacity: outroOpacity,
        transform: `translateY(${outroSlide}px)`,
      }}
    >
      <BackgroundGrid glowColor="#10b981" glowIntensity={0.35} />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '65px',
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
            badge="Fitur 02: Evaluasi & Interaksi"
            badgeColor="#10b981"
            title="Ujian Online &"
            highlightText="Penilaian Automatis"
            subtitle="Koreksi otomatis instan, analitik performa siswa real-time, dan ruang diskusi interaktif tanpa batas."
          />
        </div>

        {/* 3-Column Interface Container */}
        <div
          style={{
            width: '1540px',
            marginTop: '35px',
            display: 'grid',
            gridTemplateColumns: '460px 580px 440px',
            gap: '30px',
            alignItems: 'stretch',
          }}
        >
          {/* SECTION 1: Virtual Classroom Discussion Board */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '20px',
              border: '2px solid #1e293b',
              padding: '22px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={17} color="#38bdf8" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Diskusi Interaktif</div>
                  <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    38 Siswa Aktif Online
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Live Room</span>
            </div>

            {/* Chat Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
              {/* Message 1 */}
              <div
                style={{
                  opacity: chat1Spring,
                  transform: `translateY(${interpolate(chat1Spring, [0, 1], [30, 0])}px) scale(${chat1Spring})`,
                  backgroundColor: '#1e293b',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  border: '1px solid #334155',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#f97316', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    SR
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#f97316' }}>Siti Rahma (Mahasiswa)</span>
                  <span style={{ fontSize: '9px', color: '#64748b', marginLeft: 'auto' }}>10:14 WIB</span>
                </div>
                <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.4 }}>
                  "Pak, apakah kuis evaluasi bab 1 ada batasan waktu pengerjaan?"
                </div>
              </div>

              {/* Message 2 (Instructor Reply) */}
              <div
                style={{
                  opacity: chat2Spring,
                  transform: `translateY(${interpolate(chat2Spring, [0, 1], [30, 0])}px) scale(${chat2Spring})`,
                  backgroundColor: 'rgba(2, 132, 199, 0.15)',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  border: '1px solid rgba(2, 132, 199, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0284c7', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    HW
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>Dr. Hendra (Dosen)</span>
                  <span style={{ fontSize: '9px', color: '#64748b', marginLeft: 'auto' }}>10:15 WIB</span>
                </div>
                <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.4 }}>
                  "Waktu 30 menit, dan nilai langsung keluar otomatis beserta pembahasannya ya!"
                </div>
              </div>

              {/* Message 3 */}
              <div
                style={{
                  opacity: chat3Spring,
                  transform: `translateY(${interpolate(chat3Spring, [0, 1], [30, 0])}px) scale(${chat3Spring})`,
                  backgroundColor: '#1e293b',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  border: '1px solid #334155',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#10b981', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    BS
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>Budi Santoso (Mahasiswa)</span>
                  <span style={{ fontSize: '9px', color: '#64748b', marginLeft: 'auto' }}>10:18 WIB</span>
                </div>
                <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.4 }}>
                  "Keren banget, langsung tahu kesalahan di nomor 12 dan dapat nilai 95! 🚀"
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Automated Grade Real-Time Growth Bar Chart */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '20px',
              border: '2px solid #0284c7',
              padding: '24px 26px',
              boxShadow: '0 20px 45px rgba(2, 132, 199, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Top Score Summary Banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Hasil Ujian Tengah Semester</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Analisis Distribusi Nilai</div>
              </div>

              {/* Live Counter Widget */}
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  textAlign: 'right',
                }}
              >
                <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>RATA-RATA KELAS</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff' }}>
                  {scoreCounter.toFixed(1)} <span style={{ fontSize: '13px', color: '#10b981' }}>/ 100</span>
                </div>
              </div>
            </div>

            {/* Growth Bars Chart Area */}
            <div
              style={{
                flex: 1,
                minHeight: '200px',
                backgroundColor: '#090d16',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              {/* Bars Row */}
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px' }}>
                {[
                  { label: 'Grade A (90-100)', count: '28 Siswa', height: 130, spring: bar1Spring, color: '#10b981' },
                  { label: 'Grade B+ (80-89)', count: '10 Siswa', height: 95, spring: bar2Spring, color: '#0284c7' },
                  { label: 'Grade B (70-79)', count: '3 Siswa', height: 50, spring: bar3Spring, color: '#38bdf8' },
                  { label: 'Grade C (60-69)', count: '1 Siswa', height: 25, spring: bar4Spring, color: '#f97316' },
                  { label: 'Remedial (<60)', count: '0 Siswa', height: 8, spring: bar5Spring, color: '#ef4444' },
                ].map((bar, idx) => {
                  const currentHeight = interpolate(bar.spring, [0, 1], [0, bar.height]);
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        width: '75px',
                      }}
                    >
                      <span style={{ fontSize: '10px', fontWeight: 700, color: bar.color }}>
                        {bar.count}
                      </span>
                      <div
                        style={{
                          width: '42px',
                          height: `${currentHeight}px`,
                          backgroundColor: bar.color,
                          borderRadius: '8px 8px 3px 3px',
                          boxShadow: `0 0 15px ${bar.color}66`,
                          background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}99 100%)`,
                        }}
                      />
                      <span style={{ fontSize: '9px', color: '#94a3b8', textAlign: 'center', fontWeight: 600 }}>
                        {bar.label.split(' ')[0]} {bar.label.split(' ')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Chart Baseline */}
              <div style={{ width: '100%', height: '2px', backgroundColor: '#1e293b', marginTop: '6px' }} />
            </div>

            {/* Quick Status Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>Anti-Cheating Proctoring: 100% Valid</span>
              </div>
              <span style={{ color: '#10b981', fontWeight: 700 }}>Tingkat Kelulusan: 100%</span>
            </div>
          </div>

          {/* SECTION 3: Pop-up Notification Badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              justifyContent: 'center',
            }}
          >
            {/* Pop-up 1: Timely Submissions */}
            <div
              style={{
                opacity: notif1Spring,
                transform: `
                  translateX(${interpolate(notif1Spring, [0, 1], [60, 0])}px)
                  scale(${notif1Spring})
                `,
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                padding: '16px 20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck2 size={24} color="#10b981" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Tugas Terkumpul Lengkap</div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>42 / 42 Siswa (100% On-Time)</div>
              </div>
            </div>

            {/* Pop-up 2: Instant Auto-Grading */}
            <div
              style={{
                opacity: notif2Spring,
                transform: `
                  translateX(${interpolate(notif2Spring, [0, 1], [60, 0])}px)
                  scale(${notif2Spring})
                `,
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                border: '2px solid rgba(2, 132, 199, 0.5)',
                padding: '16px 20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(2, 132, 199, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={24} color="#38bdf8" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Auto-Grading Selesai</div>
                <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>42 Ujian Terkoreksi dalam 1.2 Detik</div>
              </div>
            </div>

            {/* Pop-up 3: Auto-Issued Certificates */}
            <div
              style={{
                opacity: notif3Spring,
                transform: `
                  translateX(${interpolate(notif3Spring, [0, 1], [60, 0])}px)
                  scale(${notif3Spring})
                `,
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                border: '2px solid rgba(249, 115, 22, 0.5)',
                padding: '16px 20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(249, 115, 22, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={24} color="#f97316" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>E-Sertifikat Diterbitkan</div>
                <div style={{ fontSize: '11px', color: '#f97316', fontWeight: 700 }}>Verifikasi QR-Code Resmi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
