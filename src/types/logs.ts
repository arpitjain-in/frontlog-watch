export interface LogEntry {
  id: string;
  timestamp: string;
  level: "error" | "warning" | "info" | "debug";
  message: string;
  stack?: string;
  url: string;
  userId?: string;
  sessionId: string;
  browser: string;
  os: string;
  appVersion: string;
  type: "error" | "network" | "performance" | "interaction" | "custom";
  customData?: Record<string, any>;
}

export interface LogFilter {
  level?: string;
  type?: string;
  search?: string;
  timeRange?: string;
}