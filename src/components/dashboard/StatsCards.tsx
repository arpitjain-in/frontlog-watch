import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Clock, Users } from "lucide-react";
import { LogEntry } from "@/types/logs";

interface StatsCardsProps {
  logs: LogEntry[];
}

export function StatsCards({ logs }: StatsCardsProps) {
  const errorCount = logs.filter(log => log.level === "error").length;
  const uniqueUsers = new Set(logs.filter(log => log.userId).map(log => log.userId)).size;
  const last24h = logs.filter(log => {
    const logTime = new Date(log.timestamp);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return logTime > oneDayAgo;
  }).length;

  const stats = [
    {
      title: "Total Errors",
      value: errorCount.toString(),
      icon: AlertTriangle,
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Events (24h)",
      value: last24h.toString(),
      icon: TrendingUp,
      trend: "-8%",
      trendUp: false
    },
    {
      title: "Affected Users",
      value: uniqueUsers.toString(),
      icon: Users,
      trend: "+3%",
      trendUp: true
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      icon: Clock,
      trend: "-15%",
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trendUp ? 'text-destructive' : 'text-success'} mt-1`}>
                {stat.trend} from last period
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}