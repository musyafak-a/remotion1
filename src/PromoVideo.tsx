import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Solution } from './scenes/Scene2Solution';
import { Scene3Management } from './scenes/Scene3Management';
import { Scene4Evaluation } from './scenes/Scene4Evaluation';
import { Scene5MultiDevice } from './scenes/Scene5MultiDevice';
import { Scene6Outro } from './scenes/Scene6Outro';

export const SCENE_DURATION = 300; // 10 seconds per scene at 30 FPS
export const TOTAL_DURATION = 1800; // 60 seconds total

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle global video progress bar at the very bottom
  const globalProgress = interpolate(frame, [0, TOTAL_DURATION], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#090d16' }}>
      {/* Scene 1: Hook / Problem (0 - 300 / 00:00 - 00:10) */}
      <Sequence from={0} durationInFrames={SCENE_DURATION} name="Scene 1: Hook & Problem">
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Solution & Intro (300 - 600 / 00:10 - 00:20) */}
      <Sequence from={300} durationInFrames={SCENE_DURATION} name="Scene 2: Solution & Intro">
        <Scene2Solution />
      </Sequence>

      {/* Scene 3: Feature 1 - Class & Material Management (600 - 900 / 00:20 - 00:30) */}
      <Sequence from={600} durationInFrames={SCENE_DURATION} name="Scene 3: Class & Material Management">
        <Scene3Management />
      </Sequence>

      {/* Scene 4: Feature 2 - Interaction & Real-time Evaluation (900 - 1200 / 00:30 - 00:40) */}
      <Sequence from={900} durationInFrames={SCENE_DURATION} name="Scene 4: Online Exam & Auto-Grading">
        <Scene4Evaluation />
      </Sequence>

      {/* Scene 5: Multi-Device Accessibility (1200 - 1500 / 00:40 - 00:50) */}
      <Sequence from={1200} durationInFrames={SCENE_DURATION} name="Scene 5: Multi-Device Responsive">
        <Scene5MultiDevice />
      </Sequence>

      {/* Scene 6: Call to Action / Outro (1500 - 1800 / 00:50 - 01:00) */}
      <Sequence from={1500} durationInFrames={SCENE_DURATION} name="Scene 6: Call to Action & Outro">
        <Scene6Outro />
      </Sequence>

      {/* Subtle modern progress bar at the bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          zIndex: 99,
        }}
      >
        <div
          style={{
            width: `${globalProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 50%, #f97316 100%)',
            boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
