import React from 'react';
import {
  GraduationCap,
  Layers,
  Play,
} from 'lucide-react';

interface MockupTabletProps {
  width?: number;
  scrollY?: number;
  children?: React.ReactNode;
}

export const MockupTablet: React.FC<MockupTabletProps> = ({
  width = 540,
  scrollY = 0,
  children,
}) => {
  const height = width * 1.36;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#1e293b',
        borderRadius: `${width * 0.08}px`,
        padding: '12px',
        border: '3px solid #475569',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(2, 132, 199, 0.25)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Front camera dot */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#0f172a',
          border: '1px solid #475569',
        }}
      />

      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0f1d',
          borderRadius: `${width * 0.06}px`,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Reflection glare */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '55%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 35,
          }}
        />

        {children ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `translateY(-${scrollY}px)`,
            }}
          >
            {children}
          </div>
        ) : (
          /* Tablet LMS UI Layout */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transform: `translateY(-${scrollY}px)`,
              fontFamily: "'Roboto', sans-serif",
              padding: '14px',
              gap: '12px',
            }}
          >
            {/* Tablet Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GraduationCap size={18} color="#fff" />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>LMS Pro Tablet</span>
              </div>
              <div style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.15)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                Live Session
              </div>
            </div>

            {/* Video Lesson Hero */}
            <div
              style={{
                height: '160px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(2, 132, 199, 0.6)',
                }}
              >
                <Play size={20} color="#fff" style={{ marginLeft: '3px' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                Materi 4: Optimasi Algoritma & Performa
              </div>
            </div>

            {/* Tablet 2-Col Widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ backgroundColor: '#111827', borderRadius: '10px', padding: '10px', border: '1px solid #1f2937' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Tugas Mandiri</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#f97316', marginTop: '2px' }}>3 Deadline</div>
                <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>Sebelum 23:59 WIB</div>
              </div>
              <div style={{ backgroundColor: '#111827', borderRadius: '10px', padding: '10px', border: '1px solid #1f2937' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Diskusi Forum</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>12 Baru</div>
                <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>Dosen menjawab aktif</div>
              </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>Materi Berikutnya</span>
              {['Struktur Data Graf & Tree', 'Implementasi Big O Notation', 'Persiapan Ujian Tengah Semester'].map((title, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #1f2937', fontSize: '11px', color: '#e2e8f0' }}>
                  <Layers size={13} color="#0284c7" />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
