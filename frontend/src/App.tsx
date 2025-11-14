import { useEffect, useState } from 'react';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import { APP_CONFIG_DEFAULTS, type AppConfig } from '@/app-config';
import { MapBackground } from '@/components/app/map-background';
import { SessionProvider } from '@/components/app/session-provider';
import { ThemeToggle } from '@/components/app/theme-toggle';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/livekit/toaster';
import { getStyles } from '@/lib/utils';

function App() {
  const [appConfig, setAppConfig] = useState<AppConfig>(APP_CONFIG_DEFAULTS);

  useEffect(() => {
    // In SPA mode, we just use the defaults
    // You can extend this to fetch config from an API if needed
    setAppConfig(APP_CONFIG_DEFAULTS);

    // Apply custom styles
    const styles = getStyles(APP_CONFIG_DEFAULTS);
    if (styles) {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);

  return (
    <SessionProvider appConfig={appConfig}>
      {/* Full-screen Mapbox background */}
      <MapBackground />

      {/* Main content layer (overlays the map) */}
      <main className="relative z-10 h-svh w-full">
        <ViewController />
      </main>

      <StartAudio label="Start Audio" />
      <RoomAudioRenderer />
      <Toaster />
      <div className="group fixed bottom-0 left-1/2 z-50 mb-2 -translate-x-1/2">
        <ThemeToggle className="translate-y-20 transition-transform delay-150 duration-300 group-hover:translate-y-0" />
      </div>
    </SessionProvider>
  );
}

export default App;
