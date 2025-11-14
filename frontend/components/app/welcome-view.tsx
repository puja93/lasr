import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="h-full w-full">
      {/* Floating START CALL button at bottom center */}
      <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2">
        <Button
          variant="primary"
          size="lg"
          onClick={onStartCall}
          className="px-12 py-6 font-mono text-lg shadow-2xl transition-transform hover:scale-105"
        >
          {startButtonText}
        </Button>
      </div>
    </div>
  );
};
