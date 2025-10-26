import { Timer } from "@/components/Timer";
import { MoodSelector } from "@/components/MoodSelector";
import { StatsDisplay } from "@/components/StatsDisplay";
import { ChatPanel } from "@/components/ChatPanel";
import { usePomodoro } from "@/hooks/usePomodoro";
import { Zap } from "lucide-react";

const Index = () => {
  const {
    timeLeft,
    phase,
    isRunning,
    stats,
    mood,
    showMotivation,
    formatTime,
    start,
    pause,
    reset,
    setMood,
    setShowMotivation,
  } = usePomodoro();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FocusBooster AI
            </h1>
          </div>
          <p className="text-muted-foreground">Your AI-powered productivity companion</p>
        </header>

        {/* Main content */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 max-w-7xl mx-auto">
          {/* Left column - Timer and stats */}
          <div className="space-y-8">
            {/* Timer */}
            <div className="flex justify-center animate-fade-in">
              <Timer
                timeLeft={timeLeft}
                phase={phase}
                isRunning={isRunning}
                formatTime={formatTime}
                onStart={start}
                onPause={pause}
                onReset={reset}
              />
            </div>

            {/* Mood selector */}
            <div className="max-w-md mx-auto animate-fade-in">
              <MoodSelector mood={mood} onMoodChange={setMood} />
            </div>

            {/* Stats */}
            <div className="max-w-md mx-auto animate-fade-in">
              <StatsDisplay
                sessionsToday={stats.sessionsToday}
                totalMinutesToday={stats.totalMinutesToday}
              />
            </div>
          </div>

          {/* Right column - Chat panel */}
          <div className="h-[600px] animate-fade-in">
            <ChatPanel
              mood={mood}
              showMotivation={showMotivation}
              onMotivationShown={() => setShowMotivation(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
