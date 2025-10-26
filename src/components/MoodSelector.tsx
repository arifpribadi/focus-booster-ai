import { Smile, Meh, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Mood } from "@/hooks/usePomodoro";

interface MoodSelectorProps {
  mood: Mood;
  onMoodChange: (mood: Mood) => void;
}

export const MoodSelector = ({ mood, onMoodChange }: MoodSelectorProps) => {
  const moods = [
    { value: "happy" as const, icon: Smile, label: "Happy" },
    { value: "neutral" as const, icon: Meh, label: "Neutral" },
    { value: "tired" as const, icon: Frown, label: "Tired" },
  ];

  return (
    <div className="backdrop-blur-glass bg-card/40 border border-primary/20 rounded-2xl p-6 space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">How are you feeling?</h3>
      <div className="flex gap-2">
        {moods.map(({ value, icon: Icon, label }) => (
          <Button
            key={value}
            onClick={() => onMoodChange(value)}
            variant="ghost"
            className={cn(
              "flex-1 flex flex-col items-center gap-2 h-auto py-3 hover:bg-primary/10 transition-all",
              mood === value && "bg-primary/20 border border-primary/40"
            )}
          >
            <Icon className={cn(
              "h-6 w-6",
              mood === value && "text-primary"
            )} />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
