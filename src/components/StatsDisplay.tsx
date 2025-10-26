import { Target, Clock } from "lucide-react";

interface StatsDisplayProps {
  sessionsToday: number;
  totalMinutesToday: number;
}

export const StatsDisplay = ({ sessionsToday, totalMinutesToday }: StatsDisplayProps) => {
  return (
    <div className="backdrop-blur-glass bg-card/40 border border-primary/20 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Today's Focus Summary
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span className="text-sm">Sessions</span>
          </div>
          <div className="text-3xl font-bold text-primary">{sessionsToday}</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Minutes</span>
          </div>
          <div className="text-3xl font-bold text-secondary">{totalMinutesToday}</div>
        </div>
      </div>
    </div>
  );
};
