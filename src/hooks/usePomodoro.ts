import { useState, useEffect, useCallback } from "react";

export type PomodoroPhase = "focus" | "break" | "idle";
export type Mood = "happy" | "neutral" | "tired" | null;

interface PomodoroStats {
  sessionsToday: number;
  totalMinutesToday: number;
  lastSessionDate: string;
}

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export const usePomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [phase, setPhase] = useState<PomodoroPhase>("idle");
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<PomodoroStats>({
    sessionsToday: 0,
    totalMinutesToday: 0,
    lastSessionDate: new Date().toDateString(),
  });
  const [mood, setMood] = useState<Mood>(null);
  const [showMotivation, setShowMotivation] = useState(false);

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem("pomodoroStats");
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      const today = new Date().toDateString();
      
      // Reset stats if it's a new day
      if (parsed.lastSessionDate !== today) {
        const newStats = {
          sessionsToday: 0,
          totalMinutesToday: 0,
          lastSessionDate: today,
        };
        setStats(newStats);
        localStorage.setItem("pomodoroStats", JSON.stringify(newStats));
      } else {
        setStats(parsed);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Phase completed
          if (phase === "focus") {
            // Focus session completed
            const newStats = {
              ...stats,
              sessionsToday: stats.sessionsToday + 1,
              totalMinutesToday: stats.totalMinutesToday + 25,
              lastSessionDate: new Date().toDateString(),
            };
            setStats(newStats);
            localStorage.setItem("pomodoroStats", JSON.stringify(newStats));
            setPhase("break");
            setShowMotivation(true);
            return BREAK_TIME;
          } else {
            // Break completed
            setPhase("idle");
            setIsRunning(false);
            return FOCUS_TIME;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, phase, stats]);

  const start = useCallback(() => {
    if (phase === "idle") {
      setPhase("focus");
      setTimeLeft(FOCUS_TIME);
    }
    setIsRunning(true);
  }, [phase]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setPhase("idle");
    setTimeLeft(FOCUS_TIME);
    setShowMotivation(false);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
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
  };
};
