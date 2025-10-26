import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PomodoroPhase } from "@/hooks/usePomodoro";

interface TimerProps {
  timeLeft: number;
  phase: PomodoroPhase;
  isRunning: boolean;
  formatTime: (seconds: number) => string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Timer = ({
  timeLeft,
  phase,
  isRunning,
  formatTime,
  onStart,
  onPause,
  onReset,
}: TimerProps) => {
  return (
    <div className="relative">
      {/* Glow effect */}
      {isRunning && (
        <div className="absolute inset-0 bg-gradient-glow animate-pulse-glow rounded-full blur-3xl" />
      )}
      
      {/* Timer circle */}
      <div
        className={cn(
          "relative backdrop-blur-glass bg-card/40 border border-primary/20 rounded-full p-12 shadow-2xl transition-all duration-500",
          isRunning && "border-primary/40 shadow-[0_0_60px_hsl(var(--primary)/0.3)]"
        )}
      >
        <div className="text-center space-y-6">
          {/* Phase label */}
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {phase === "focus" && "Focus Time"}
            {phase === "break" && "Break Time"}
            {phase === "idle" && "Ready to Focus"}
          </div>

          {/* Time display */}
          <div className="text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {formatTime(timeLeft)}
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            {!isRunning ? (
              <Button
                onClick={onStart}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                {phase === "idle" ? "Start Focus" : "Resume"}
              </Button>
            ) : (
              <Button
                onClick={onPause}
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
              >
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </Button>
            )}

            <Button
              onClick={onReset}
              size="lg"
              variant="ghost"
              className="hover:bg-muted/50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
