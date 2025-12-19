import { useState, useEffect } from "react";
import { metricsService, type MachineMetrics } from "../api/services/MetricsService";

export const useHistoricalMetrics = (date: Date, shift: "morning" | "night") => {
    const [metricsList, setMetricsList] = useState<MachineMetrics[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await metricsService.getHistoricalMetrcis(date, shift);

                if (isMounted) {
                    setMetricsList(Array.isArray(data) ? data : []);
                }
            } catch (err: any) {
                console.error("Error fetching history:", err);
                if (isMounted) {
                    setError("Error al cargar el historial");
                    setMetricsList([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [date, shift]);

    return { metricsList, loading, error };
};