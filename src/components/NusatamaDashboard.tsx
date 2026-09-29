import React from 'react';
import {
  BookOpen,
  Building,
  GraduationCap,
  LayoutDashboard,
  Users,
} from 'lucide-react';

interface NusatamaDashboardProps {
  isMobile?: boolean;
}

export const NusatamaDashboard: React.FC<NusatamaDashboardProps> = ({ isMobile = false }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        height: '100%',
        backgroundColor: '#f8fafc',
        fontFamily: "'Roboto', sans-serif",
        color: '#0f172a',
        overflow: 'hidden',
      }}
    >
      {/* Left Sidebar (Desktop Only) */}
      {!isMobile && (
        <div
          style={{
            width: '175px',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e2e8f0',
            padding: '12px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #0284c7 0%, #f97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 900,
              }}
            >
              E
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Excellent</div>
              <div style={{ fontSize: '8px', color: '#64748b' }}>Course</div>
            </div>
          </div>

          {/* Nav List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[
              { label: 'Dasbor', active: true, icon: LayoutDashboard },
              { label: 'Manajemen Siswa', icon: Users },
              { label: 'Manajemen Mentor', icon: GraduationCap },
              { label: 'E-Learning', icon: BookOpen },
              { label: 'Kemitraan Sekolah', icon: Building },
            ].map((nav, i) => {
              const Icon = nav.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    backgroundColor: nav.active ? '#eff6ff' : 'transparent',
                    color: nav.active ? '#0284c7' : '#64748b',
                    fontSize: '10px',
                    fontWeight: nav.active ? 700 : 500,
                  }}
                >
                  <Icon size={12} />
                  <span>{nav.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          padding: isMobile ? '10px' : '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '8px' : '12px',
          overflow: 'hidden',
          backgroundColor: '#f8fafc',
        }}
      >
        {/* Top welcome banner (Exact match to image) */}
        <div
          style={{
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 60%, #1e40af 100%)',
            padding: isMobile ? '10px' : '14px 18px',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
          }}
        >
          <div style={{ fontSize: isMobile ? '12px' : '15px', fontWeight: 800 }}>
            Selamat Datang, superadmin!
          </div>
          <div style={{ fontSize: isMobile ? '9px' : '11px', color: '#e0f2fe', marginTop: '2px', lineHeight: 1.3 }}>
            Kelola operasional lembaga Excellent dengan mudah dan efisien melalui dashboard terintegrasi Anda.
          </div>
        </div>

        {/* 4 Stat Cards: Total Pengguna (49), Sekolah Mitra (24), Total Mentor (29), Program Kursus (13) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '6px' : '10px',
          }}
        >
          {[
            { label: 'Total Pengguna', val: '49', bg: '#0284c7', icon: Users },
            { label: 'Sekolah Mitra', val: '24', bg: '#6366f1', icon: Building },
            { label: 'Total Mentor', val: '29', bg: '#8b5cf6', icon: GraduationCap },
            { label: 'Program Kursus', val: '13', bg: '#ef4444', icon: BookOpen },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: isMobile ? '6px 8px' : '8px 12px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: isMobile ? '24px' : '30px',
                  height: isMobile ? '24px' : '30px',
                  borderRadius: '6px',
                  backgroundColor: item.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <item.icon size={isMobile ? 12 : 16} />
              </div>
              <div>
                <div style={{ fontSize: isMobile ? '8px' : '9px', color: '#64748b' }}>{item.label}</div>
                <div style={{ fontSize: isMobile ? '13px' : '16px', fontWeight: 800, color: '#0f172a' }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Charts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '6px' : '10px',
            flex: 1,
          }}
        >
          {/* Chart 1: Grafik Arus Kas (Pemasukan vs Pengeluaran) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: isMobile ? '6px 8px' : '10px 12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ fontSize: isMobile ? '9px' : '11px', fontWeight: 700, color: '#0f172a' }}>
              Grafik Arus Kas (12 Bulan Terakhir)
            </div>
            {/* Simulated Bar Chart */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                minHeight: isMobile ? '50px' : '75px',
                paddingTop: '8px',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              {[
                { green: 20, red: 15 },
                { green: 35, red: 20 },
                { green: 50, red: 25 },
                { green: 80, red: 40 },
                { green: 65, red: 75 },
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                  <div style={{ width: isMobile ? '6px' : '10px', height: `${bar.green}px`, backgroundColor: '#10b981', borderRadius: '2px 2px 0 0' }} />
                  <div style={{ width: isMobile ? '6px' : '10px', height: `${bar.red}px`, backgroundColor: '#ef4444', borderRadius: '2px 2px 0 0' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '4px', fontSize: '8px', color: '#64748b' }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>■ Pemasukan</span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>■ Pengeluaran</span>
            </div>
          </div>

          {/* Chart 2: Pertumbuhan Pendaftaran Siswa (Bell Curve line) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: isMobile ? '6px 8px' : '10px 12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ fontSize: isMobile ? '9px' : '11px', fontWeight: 700, color: '#0f172a' }}>
              Pertumbuhan Pendaftaran Siswa
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: isMobile ? '50px' : '75px',
              }}
            >
              <svg width="100%" height={isMobile ? '45' : '65'} viewBox="0 0 200 65" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 60 Q 70 58, 120 15 T 200 58 L 200 65 L 0 65 Z" fill="url(#curveGrad)" />
                <path d="M 0 60 Q 70 58, 120 15 T 200 58" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                <circle cx="120" cy="15" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
            <div style={{ fontSize: '8px', color: '#64748b', textAlign: 'center' }}>
              Puncak Pendaftaran: Jun 2026 (18 Siswa Baru)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
