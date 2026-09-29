import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  FolderPlus,
  GripVertical,
  HelpCircle,
  MousePointer,
  UploadCloud,
  Video,
} from 'lucide-react';
import { BackgroundGrid } from '../components/BackgroundGrid';
import { HeaderBadge } from '../components/HeaderBadge';

export const Scene3Management: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for main layout
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Drag and Drop 1: Video Module (Frames 30 - 100)
  const drag1Progress = interpolate(frame, [30, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isDropped1 = frame >= 95;

  // Drag and Drop 2: Interactive Quiz (Frames 105 - 170)
  const drag2Progress = interpolate(frame, [105, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isDropped2 = frame >= 165;

  // Drag and Drop 3: PDF Document (Frames 175 - 235)
  const drag3Progress = interpolate(frame, [175, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isDropped3 = frame >= 230;

  // Virtual cursor positions (X and Y coordinates across screen)
  let cursorX = 260;
  let cursorY = 460;
  let isCursorGrabbing = false;

  if (frame < 30) {
    cursorX = interpolate(frame, [10, 30], [500, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    cursorY = interpolate(frame, [10, 30], [700, 470], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 30 && frame < 95) {
    isCursorGrabbing = true;
    cursorX = interpolate(drag1Progress, [0, 1], [260, 1150]);
    cursorY = interpolate(drag1Progress, [0, 1], [470, 480]);
  } else if (frame >= 95 && frame < 105) {
    cursorX = interpolate(frame, [95, 105], [1150, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    cursorY = interpolate(frame, [95, 105], [480, 580], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 105 && frame < 165) {
    isCursorGrabbing = true;
    cursorX = interpolate(drag2Progress, [0, 1], [260, 1150]);
    cursorY = interpolate(drag2Progress, [0, 1], [580, 560]);
  } else if (frame >= 165 && frame < 175) {
    cursorX = interpolate(frame, [165, 175], [1150, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    cursorY = interpolate(frame, [165, 175], [560, 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 175 && frame < 230) {
    isCursorGrabbing = true;
    cursorX = interpolate(drag3Progress, [0, 1], [260, 1150]);
    cursorY = interpolate(drag3Progress, [0, 1], [680, 640]);
  } else {
    cursorX = interpolate(frame, [230, 260], [1150, 1300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    cursorY = interpolate(frame, [230, 260], [640, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  // Snappy spring ripples when dropped
  const dropRipple1 = spring({ frame: frame - 95, fps, config: { damping: 10, stiffness: 120 } });
  const dropRipple2 = spring({ frame: frame - 165, fps, config: { damping: 10, stiffness: 120 } });
  const dropRipple3 = spring({ frame: frame - 230, fps, config: { damping: 10, stiffness: 120 } });

  // Outro transition (Frames 275 - 300)
  const outroSlide = interpolate(frame, [275, 300], [0, -100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
      <BackgroundGrid glowColor="#0284c7" glowIntensity={0.4} />

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
            transform: `translateY(${interpolate(enterSpring, [0, 1], [-40, 0])}px)`,
            opacity: enterSpring,
          }}
        >
          <HeaderBadge
            badge="Fitur 01: Manajemen Cerdas"
            badgeColor="#0284c7"
            title="Upload Materi & Atur Jadwal"
            highlightText="Tanpa Ribet"
            subtitle="Drag & drop video, kuis interaktif, dan modul kuliah dengan pengelompokan folder instan dan kalender otomatis."
          />
        </div>

        {/* 2-Column Workstation Container */}
        <div
          style={{
            width: '1540px',
            marginTop: '35px',
            display: 'grid',
            gridTemplateColumns: '460px 1fr',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* LEFT COLUMN: Upload Queue / Unassigned Library */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '20px',
              border: '2px solid #1e293b',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(2, 132, 199, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UploadCloud size={18} color="#38bdf8" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>Antrean Materi</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Tarik materi ke dalam kelas</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', backgroundColor: '#1e293b', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                {isDropped3 ? '0 Item' : isDropped2 ? '1 Item' : isDropped1 ? '2 Items' : '3 Items'}
              </span>
            </div>

            {/* Draggable Card 1: Video Module */}
            <div
              style={{
                backgroundColor: isDropped1 ? 'rgba(30, 41, 59, 0.3)' : '#1e293b',
                borderRadius: '14px',
                border: isDropped1 ? '1px dashed #334155' : '1px solid #334155',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: isDropped1 ? 0.3 : 1,
                transform: !isDropped1 && drag1Progress > 0 ? `
                  translate3d(${interpolate(drag1Progress, [0, 1], [0, 880])}px, ${interpolate(drag1Progress, [0, 0.5, 1], [0, -40, 10])}px, 0)
                  scale(${interpolate(drag1Progress, [0, 0.1, 0.9, 1], [1, 1.05, 1.05, 1])})
                  rotate(${interpolate(drag1Progress, [0, 0.5, 1], [0, 3, 0])}deg)
                ` : 'none',
                boxShadow: !isDropped1 && drag1Progress > 0 ? '0 25px 40px rgba(0,0,0,0.8), 0 0 25px rgba(2, 132, 199, 0.5)' : 'none',
                zIndex: !isDropped1 && drag1Progress > 0 ? 40 : 1,
                transition: 'none',
              }}
            >
              <GripVertical size={16} color="#64748b" />
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Bab 1: Intro React & TS.mp4</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Video HD 1080p • 24 Menit • 380 MB</div>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                VIDEO
              </span>
            </div>

            {/* Draggable Card 2: Interactive Quiz */}
            <div
              style={{
                backgroundColor: isDropped2 ? 'rgba(30, 41, 59, 0.3)' : '#1e293b',
                borderRadius: '14px',
                border: isDropped2 ? '1px dashed #334155' : '1px solid #334155',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: isDropped2 ? 0.3 : 1,
                transform: !isDropped2 && drag2Progress > 0 ? `
                  translate3d(${interpolate(drag2Progress, [0, 1], [0, 880])}px, ${interpolate(drag2Progress, [0, 0.5, 1], [0, -35, -20])}px, 0)
                  scale(${interpolate(drag2Progress, [0, 0.1, 0.9, 1], [1, 1.05, 1.05, 1])})
                  rotate(${interpolate(drag2Progress, [0, 0.5, 1], [0, 3, 0])}deg)
                ` : 'none',
                boxShadow: !isDropped2 && drag2Progress > 0 ? '0 25px 40px rgba(0,0,0,0.8), 0 0 25px rgba(249, 115, 22, 0.5)' : 'none',
                zIndex: !isDropped2 && drag2Progress > 0 ? 40 : 1,
              }}
            >
              <GripVertical size={16} color="#64748b" />
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HelpCircle size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Kuis Evaluasi Bab 1</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>15 Soal Pilihan Ganda • Timer 30 Min</div>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#f97316', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                KUIS
              </span>
            </div>

            {/* Draggable Card 3: PDF Document */}
            <div
              style={{
                backgroundColor: isDropped3 ? 'rgba(30, 41, 59, 0.3)' : '#1e293b',
                borderRadius: '14px',
                border: isDropped3 ? '1px dashed #334155' : '1px solid #334155',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: isDropped3 ? 0.3 : 1,
                transform: !isDropped3 && drag3Progress > 0 ? `
                  translate3d(${interpolate(drag3Progress, [0, 1], [0, 880])}px, ${interpolate(drag3Progress, [0, 0.5, 1], [0, -30, -50])}px, 0)
                  scale(${interpolate(drag3Progress, [0, 0.1, 0.9, 1], [1, 1.05, 1.05, 1])})
                  rotate(${interpolate(drag3Progress, [0, 0.5, 1], [0, 3, 0])}deg)
                ` : 'none',
                boxShadow: !isDropped3 && drag3Progress > 0 ? '0 25px 40px rgba(0,0,0,0.8), 0 0 25px rgba(16, 185, 129, 0.5)' : 'none',
                zIndex: !isDropped3 && drag3Progress > 0 ? 40 : 1,
              }}
            >
              <GripVertical size={16} color="#64748b" />
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Modul Panduan Praktikum.pdf</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Dokumen Lengkap • 48 Halaman • 4.2 MB</div>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                PDF
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Target Class Folder & Schedule Sync */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Target Class Dropzone Box */}
            <div
              style={{
                backgroundColor: '#0f172a',
                borderRadius: '20px',
                border: '2px solid #0284c7',
                padding: '24px 28px',
                boxShadow: '0 20px 45px rgba(2, 132, 199, 0.25)',
                position: 'relative',
              }}
            >
              {/* Folder Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FolderPlus size={24} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Kelas: Pemrograman Web Modern 2026</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Dosen Pengampu: Dr. Hendra Wijaya, M.Kom • 42 Mahasiswa</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid rgba(2, 132, 199, 0.4)', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>
                    <Clock size={14} />
                    <span>Senin & Kamis 09:00 WIB</span>
                  </div>
                </div>
              </div>

              {/* Drop Target List Area */}
              <div
                style={{
                  minHeight: '230px',
                  backgroundColor: '#090d16',
                  borderRadius: '14px',
                  border: '2px dashed rgba(2, 132, 199, 0.4)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {!isDropped1 && !isDropped2 && !isDropped3 && (
                  <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <UploadCloud size={32} color="#334155" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Tarik modul pembelajaran ke area folder ini</span>
                  </div>
                )}

                {/* Dropped Item 1 */}
                {isDropped1 && (
                  <div
                    style={{
                      transform: `scale(${dropRipple1})`,
                      backgroundColor: '#1e293b',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: '4px solid #0284c7',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Video size={18} color="#0284c7" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Bab 1: Intro React & TS.mp4</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '11px', fontWeight: 700 }}>
                      <CheckCircle size={15} />
                      <span>Tersinkronisasi ke Siswa</span>
                    </div>
                  </div>
                )}

                {/* Dropped Item 2 */}
                {isDropped2 && (
                  <div
                    style={{
                      transform: `scale(${dropRipple2})`,
                      backgroundColor: '#1e293b',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: '4px solid #f97316',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <HelpCircle size={18} color="#f97316" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Kuis Evaluasi Bab 1 (Auto-Scoring)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '11px', fontWeight: 700 }}>
                      <CheckCircle size={15} />
                      <span>Jadwal Aktif</span>
                    </div>
                  </div>
                )}

                {/* Dropped Item 3 */}
                {isDropped3 && (
                  <div
                    style={{
                      transform: `scale(${dropRipple3})`,
                      backgroundColor: '#1e293b',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: '4px solid #10b981',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={18} color="#10b981" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Modul Panduan Praktikum.pdf</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '11px', fontWeight: 700 }}>
                      <CheckCircle size={15} />
                      <span>Siap Unduh</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Smart Schedule Timetable Auto-Generation Bar */}
            <div
              style={{
                backgroundColor: '#111827',
                borderRadius: '16px',
                border: '1px solid #1f2937',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="#38bdf8" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Kalender & Pengingat Otomatis</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '11px', backgroundColor: '#1e293b', color: '#94a3b8', padding: '4px 12px', borderRadius: '6px' }}>
                  Notifikasi WA & Email Aktif
                </span>
                <span style={{ fontSize: '11px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: '6px', fontWeight: 700 }}>
                  Terjadwal Sempurna
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Mouse Pointer */}
        <div
          style={{
            position: 'absolute',
            left: `${cursorX}px`,
            top: `${cursorY}px`,
            zIndex: 60,
            pointerEvents: 'none',
            transform: isCursorGrabbing ? 'scale(0.9) rotate(-10deg)' : 'scale(1)',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
          }}
        >
          <MousePointer size={30} color="#ffffff" fill="#0284c7" />
          {isCursorGrabbing && (
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-40px',
                backgroundColor: '#f97316',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              DRAGGING
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
