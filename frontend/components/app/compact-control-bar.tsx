import { Track } from 'livekit-client';
import {
  BarVisualizer,
  useLocalParticipant,
  useVoiceAssistant,
} from '@livekit/components-react';
import { MicrophoneSlash, Microphone, PhoneDisconnect, VideoCamera, VideoCameraSlash } from '@phosphor-icons/react';
import { useSession } from '@/components/app/session-provider';
import { Button } from '@/components/livekit/button';
import { Toggle } from '@/components/livekit/toggle';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

interface CompactControlBarProps {
  className?: string;
}

export function CompactControlBar({ className }: CompactControlBarProps) {
  const { localParticipant } = useLocalParticipant();
  const { state: agentState, audioTrack: agentAudioTrack } = useVoiceAssistant();
  const { endSession } = useSession();

  const micTrack = localParticipant.getTrackPublication(Track.Source.Microphone);
  const cameraTrack = localParticipant.getTrackPublication(Track.Source.Camera);

  const isMicMuted = micTrack?.isMuted ?? true;
  const isCameraEnabled = cameraTrack && !cameraTrack.isMuted;

  const handleToggleMic = useCallback(async () => {
    await localParticipant.setMicrophoneEnabled(isMicMuted);
  }, [localParticipant, isMicMuted]);

  const handleToggleCamera = useCallback(async () => {
    await localParticipant.setCameraEnabled(!isCameraEnabled);
  }, [localParticipant, isCameraEnabled]);

  const handleEndCall = useCallback(() => {
    endSession();
  }, [endSession]);

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 z-20 -translate-x-1/2',
        'flex items-center gap-2 px-4 py-3 rounded-full',
        'bg-background/90 backdrop-blur-md border border-input/50',
        'shadow-2xl',
        className
      )}
    >
      {/* Microphone Toggle */}
      <Toggle
        size="icon"
        variant="secondary"
        aria-label="Toggle microphone"
        pressed={!isMicMuted}
        onPressedChange={handleToggleMic}
        className="shrink-0"
      >
        {isMicMuted ? (
          <MicrophoneSlash weight="bold" className="h-5 w-5" />
        ) : (
          <Microphone weight="bold" className="h-5 w-5" />
        )}
      </Toggle>

      {/* Waveform Visualizer */}
      <div className="flex items-center gap-1 px-4 min-w-[120px] md:min-w-[200px]">
        <BarVisualizer
          barCount={7}
          state={agentState}
          options={{ minHeight: 3 }}
          trackRef={agentAudioTrack}
          className="flex h-8 items-center justify-center gap-1"
        >
          <span
            className={cn([
              'bg-muted min-h-1.5 w-1.5 rounded-full',
              'origin-center transition-colors duration-250 ease-linear',
              'data-[lk-highlighted=true]:bg-primary data-[lk-muted=true]:bg-muted',
            ])}
          />
        </BarVisualizer>
      </div>

      {/* Camera Toggle */}
      <Toggle
        size="icon"
        variant="secondary"
        aria-label="Toggle camera"
        pressed={isCameraEnabled}
        onPressedChange={handleToggleCamera}
        className="shrink-0"
      >
        {isCameraEnabled ? (
          <VideoCamera weight="bold" className="h-5 w-5" />
        ) : (
          <VideoCameraSlash weight="bold" className="h-5 w-5" />
        )}
      </Toggle>

      {/* End Call Button */}
      <Button
        variant="destructive"
        size="icon"
        onClick={handleEndCall}
        aria-label="End call"
        className="shrink-0"
      >
        <PhoneDisconnect weight="bold" className="h-5 w-5" />
      </Button>
    </div>
  );
}
