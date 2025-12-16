import { useCallback, useEffect, useState } from "react";
import { metricsService } from "@/api/services/MetricsService";

export const useActiveSession = (autoFetch = true) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<number[]>([]);

    const fetchActiveSession = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await metricsService.getActiveSession();

            setData(response);
        } catch (err: any) {
            setError(err?.message || "Error de conexión");
            console.error("Error en traer los datos");
        } finally {
            setLoading(false);
        };
    }, []);

    const refetch = useCallback(() => {
        return fetchActiveSession();
    }, [fetchActiveSession]);


    useEffect(() => {
        if (autoFetch) {
            fetchActiveSession();
        }
    }, [autoFetch, fetchActiveSession]);

    return {
        session: data,
        loading,
        error,
        fetchActiveSession,
        refetch
    };
};