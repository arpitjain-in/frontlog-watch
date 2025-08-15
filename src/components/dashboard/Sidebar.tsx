import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Globe, 
  Zap, 
  MousePointer, 
  Code,
  Filter,
  Search
} from "lucide-react";

interface SidebarProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  logCounts: Record<string, number>;
}

const logTypes = [
  { id: "all", label: "All Logs", icon: Filter },
  { id: "error", label: "Errors", icon: AlertTriangle },
  { id: "network", label: "Network", icon: Globe },
  { id: "performance", label: "Performance", icon: Zap },
  { id: "interaction", label: "Interactions", icon: MousePointer },
  { id: "custom", label: "Custom Events", icon: Code },
];

export function Sidebar({ selectedType, onTypeChange, logCounts }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">LogScope</h2>
        <p className="text-sm text-muted-foreground">Frontend Error Monitoring</p>
      </div>

      <nav className="space-y-2">
        {logTypes.map((type) => {
          const Icon = type.icon;
          const count = logCounts[type.id] || 0;
          const isSelected = selectedType === type.id;

          return (
            <Button
              key={type.id}
              variant={isSelected ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-between h-10",
                isSelected && "bg-secondary text-secondary-foreground"
              )}
              onClick={() => onTypeChange(type.id)}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span>{type.label}</span>
              </div>
              {count > 0 && (
                <Badge variant="outline" className="text-xs">
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}