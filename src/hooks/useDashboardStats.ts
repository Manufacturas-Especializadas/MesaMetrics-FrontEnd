import {
  metricsService,
  type DashboardStats,
} from "@/api/services/MetricsService";
import { useCallback, useEffect, useState } from "react";

const INITIAL_STATS: DashboardStats = {
  produciendo: 0,
  detenido: 0,
  alerta: 0,
  sinDatos: 0,
  sinTurno: 0,
  total: 0,
};

export const useDashboardStats = (autoFetch = true) => {
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await metricsService.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      console.error("Error fetching dashboard stats: ", err);
      setError(err.message || "Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchStats();
    }
  }, [autoFetch, fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
