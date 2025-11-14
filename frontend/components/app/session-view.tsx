import React from 'react';
import type { AppConfig } from '@/app-config';
import { CompactControlBar } from '@/components/app/compact-control-bar';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig: _appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  return (
    <section className="relative z-10 h-full w-full" {...props}>
      {/* Compact Control Bar - floats at bottom center over the map */}
      <CompactControlBar />
    </section>
  );
};
