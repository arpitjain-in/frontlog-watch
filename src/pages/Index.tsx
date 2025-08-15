import { useState, useMemo } from "react";
import { mockLogs } from "@/data/mockLogs";
import { LogEntry, LogFilter } from "@/types/logs";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { LogCard } from "@/components/dashboard/LogCard";
import { StatsCards } from "@/components/dashboard/StatsCards";

const Index = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [filters, setFilters] = useState<LogFilter>({});

  // Filter logs based on selected type and filters
  const filteredLogs = useMemo(() => {
    let filtered = mockLogs;

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(log => log.type === selectedType);
    }

    // Filter by level
    if (filters.level) {
      filtered = filtered.filter(log => log.level === filters.level);
    }

    // Filter by search term
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(search) ||
        log.url.toLowerCase().includes(search) ||
        (log.userId && log.userId.toLowerCase().includes(search))
      );
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [selectedType, filters]);

  // Calculate log counts for sidebar
  const logCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: mockLogs.length,
      error: mockLogs.filter(log => log.type === "error").length,
      network: mockLogs.filter(log => log.type === "network").length,
      performance: mockLogs.filter(log => log.type === "performance").length,
      interaction: mockLogs.filter(log => log.type === "interaction").length,
      custom: mockLogs.filter(log => log.type === "custom").length,
    };
    return counts;
  }, []);

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    console.log("Refreshing logs...");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        logCounts={logCounts}
      />
      
      <div className="flex-1 flex flex-col">
        <FilterBar 
          filters={filters}
          onFiltersChange={setFilters}
          onRefresh={handleRefresh}
        />
        
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitoring {filteredLogs.length} log entries
            </p>
          </div>

          <StatsCards logs={filteredLogs} />

          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No logs found matching your filters.</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <LogCard key={log.id} log={log} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
