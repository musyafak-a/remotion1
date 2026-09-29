import React from 'react';
import { THEME } from '../theme';
import { NusatamaDashboard } from './NusatamaDashboard';

interface MockupLaptopProps {
  width?: number;
  scrollY?: number;
  children?: React.ReactNode;
}

export const MockupLaptop: React.FC<MockupLaptopProps> = ({
  width = 960,
  scrollY = 0,
  children,
}) => {
  const height = width * 0.62;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        filter: `drop-shadow(0 25px 50px ${THEME.darkBlueShadow}) drop-shadow(0 0 40px rgba(27, 140, 180, 0.35))`,
      }}
    >
      {/* Top Lid / Screen Frame */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: THEME.darkBlue,
          borderRadius: '20px 20px 6px 6px',
          padding: '12px 14px 16px 14px',
          border: '2px solid #1c4b70',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.25)',
        }}
      >
        {/* Webcam & Sensor */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#071826',
              border: '1px solid #1c4b70',
            }}
          />
          <div
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              backgroundColor: THEME.mainText,
              boxShadow: `0 0 4px ${THEME.mainText}`,
            }}
          />
        </div>

        {/* Display Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #10344f',
          }}
        >
          {/* Glass glare line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 30,
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
              }}
            >
              <NusatamaDashboard />
            </div>
          )}
        </div>
      </div>

      {/* Laptop Base / Keyboard Section */}
      <div
        style={{
          width: `${width * 1.14}px`,
          height: '18px',
          backgroundColor: '#113551',
          borderRadius: '2px 2px 14px 14px',
          border: '1px solid #1c4b70',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.25)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Notch Opening cutout */}
        <div
          style={{
            width: '100px',
            height: '6px',
            backgroundColor: '#0a2337',
            borderRadius: '0 0 6px 6px',
          }}
        />
      </div>
    </div>
  );
};
