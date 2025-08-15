import { LogEntry } from "@/types/logs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Clock, Globe, Monitor, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogCardProps {
  log: LogEntry;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "error":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "warning":
      return "bg-warning/10 text-warning border-warning/20";
    case "info":
      return "bg-info/10 text-info border-info/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "error":
      return "bg-destructive/20 text-destructive";
    case "network":
      return "bg-info/20 text-info";
    case "performance":
      return "bg-warning/20 text-warning";
    case "interaction":
      return "bg-success/20 text-success";
    case "custom":
      return "bg-primary/20 text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function LogCard({ log }: LogCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getLevelColor(log.level)} variant="outline">
                {log.level.toUpperCase()}
              </Badge>
              <Badge className={getTypeColor(log.type)} variant="outline">
                {log.type}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatTimestamp(log.timestamp)}
              </div>
            </div>
            <h3 className="font-medium text-foreground leading-tight">
              {log.message}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">URL:</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {log.url}
                </code>
              </div>
              {log.userId && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">User ID:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {log.userId}
                  </code>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Browser:</span>
                <span className="text-xs">{log.browser}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">OS:</span>
                <span className="ml-2 text-xs">{log.os}</span>
              </div>
              <div>
                <span className="text-muted-foreground">App Version:</span>
                <span className="ml-2 text-xs">{log.appVersion}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Session:</span>
                <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                  {log.sessionId}
                </code>
              </div>
            </div>
          </div>

          {log.stack && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Stack Trace:</span>
              <pre className="text-xs bg-secondary p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
                {log.stack}
              </pre>
            </div>
          )}

          {log.customData && Object.keys(log.customData).length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Custom Data:</span>
              <pre className="text-xs bg-secondary p-3 rounded-md overflow-x-auto">
                {JSON.stringify(log.customData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}