import React from 'react';
import { THEME } from '../theme';
import { NusatamaDashboard } from './NusatamaDashboard';

interface MockupPhoneProps {
  width?: number;
  scrollY?: number;
  children?: React.ReactNode;
}

export const MockupPhone: React.FC<MockupPhoneProps> = ({
  width = 300,
  scrollY = 0,
  children,
}) => {
  const height = width * 2.05;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: THEME.darkBlue,
        borderRadius: `${width * 0.14}px`,
        padding: '10px',
        border: '3px solid #1c4b70',
        boxShadow: `0 25px 60px ${THEME.darkBlueShadow}, 0 0 35px rgba(27, 140, 180, 0.4)`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Side Volume & Power Buttons */}
      <div
        style={{
          position: 'absolute',
          left: '-6px',
          top: '70px',
          width: '4px',
          height: '40px',
          backgroundColor: '#1c4b70',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '-6px',
          top: '120px',
          width: '4px',
          height: '40px',
          backgroundColor: '#1c4b70',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-6px',
          top: '90px',
          width: '4px',
          height: '55px',
          backgroundColor: '#1c4b70',
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Screen Area */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8fafc',
          borderRadius: `${width * 0.11}px`,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Dynamic Island Notch */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '20px',
            backgroundColor: '#000000',
            borderRadius: '12px',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1e293b' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: THEME.mainText }} />
        </div>

        {/* Gloss Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%)',
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
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `translateY(-${scrollY}px)`,
              paddingTop: '32px',
            }}
          >
            <NusatamaDashboard isMobile />
          </div>
        )}
      </div>
    </div>
  );
};
