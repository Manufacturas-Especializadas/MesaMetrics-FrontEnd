import { useCallback, useEffect, useState } from "react";
import { generalListService, type Shifts } from "../api/services/GeneralListsService";


export const useShifts = (autoFetch = true) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Shifts[]>([]);

    const fetchShifts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await generalListService.getShifts();

            if (response.success) {
                const shiftsData = Array.isArray(response.data)
                    ? response.data
                    : [response.data];

                setData(shiftsData);
            } else {
                setError(response.message || "Error al obtener los turnos");
            }
        } catch (err: any) {
            setError(err?.message || "Error de conexión");
            console.error("Error en traer los datos: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        return fetchShifts();
    }, [fetchShifts]);

    useEffect(() => {
        if (autoFetch) {
            fetchShifts();
        }
    }, [autoFetch, fetchShifts]);

    return {
        shifts: data,
        loading,
        error,
        fetchShifts,
        refetch
    };
};