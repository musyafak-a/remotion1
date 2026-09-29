import React from 'react';
import { Composition, Sequence } from 'remotion';
import { TikTokPromoVideo, TIKTOK_DURATION } from './tiktok/TikTokPromo';
import { PromoVideo, SCENE_DURATION, TOTAL_DURATION } from './PromoVideo';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Solution } from './scenes/Scene2Solution';
import { Scene3Management } from './scenes/Scene3Management';
import { Scene4Evaluation } from './scenes/Scene4Evaluation';
import { Scene5MultiDevice } from './scenes/Scene5MultiDevice';
import { Scene6Outro } from './scenes/Scene6Outro';
import { IdeaAnimation } from './IdeaAnimation';
import { SearchAnimation } from './SearchAnimation';

// Combined Component
const CombinedIdeaAndSearch: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={150}>
        <IdeaAnimation />
      </Sequence>
      <Sequence from={150} durationInFrames={200}>
        <SearchAnimation />
      </Sequence>
    </>
  );
};

export const MyComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="IdeaAnimation"
        component={CombinedIdeaAndSearch}
        durationInFrames={350} // 150 + 200
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Kept SearchAnimation separate just in case user wants to view it alone */}
      <Composition
        id="SearchAnimation"
        component={SearchAnimation}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 15-Detik Video TikTok / Reels / Shorts Format Vertikal (1080x1920, 30 FPS, 450 frame) */}
      <Composition
        id="TikTokLMSPromo"
        component={TikTokPromoVideo}
        durationInFrames={TIKTOK_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 60-Detik Master Video Promosi Horizontal Penuh (1920x1080, 30 FPS, 1800 frame) */}
      <Composition
        id="LMSPromoVideo"
        component={PromoVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Komposisi Per-Scene untuk Preview Individual */}
      <Composition
        id="Scene-1-Hook"
        component={Scene1Hook}
        durationInFrames={SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-2-Solution"
        component={Scene2Solution}
        durationInFrames={SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-3-ClassManagement"
        component={Scene3Management}
        durationInFrames={SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-4-Evaluation"
        component={Scene4Evaluation}
        durationInFrames={SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-5-MultiDevice"
        component={Scene5MultiDevice}
        durationInFrames={SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene-6-OutroCTA"
        component={Scene6Outro}
        durationInFrames={SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

export const LMSPromoComposition = MyComposition;
