'use client';

import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { MapboxMap } from '@/components/app/mapbox-map';
import { SessionProvider } from '@/components/app/session-provider';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/livekit/toaster';

interface AppProps {
  appConfig: AppConfig;
  mapboxToken: string;
}

export function App({ appConfig, mapboxToken }: AppProps) {
  return (
    <SessionProvider appConfig={appConfig}>
      {/* Mapbox Map Background */}
      <div className="fixed inset-0 z-0">
        <MapboxMap className="h-full w-full" mapboxToken={mapboxToken} />
      </div>

      {/* Main Content Overlay */}
      <main className="relative z-10 grid h-svh grid-cols-1 place-content-center">
        <ViewController />
      </main>
      <StartAudio label="Start Audio" />
      <RoomAudioRenderer />
      <Toaster />
    </SessionProvider>
  );
}
