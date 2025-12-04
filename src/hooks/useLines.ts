import { useCallback, useEffect, useState } from "react";
import { generalListService, type Lines } from "../api/services/GeneralListsService";


export const useLines = (autoFetch = true) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<Lines[]>([]);

    const fetchLines = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await generalListService.getLines();

            if (response.success) {
                const linesData = Array.isArray(response.data)
                    ? response.data
                    : [response.data];

                setData(linesData);
            } else {
                setError(response.message || "Error al obtener los datos");
            }
        } catch (err: any) {
            setError(err?.message || "Error de conexión");
            console.error("Error en traer los datos: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        return fetchLines();
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchLines();
        }
    }, [autoFetch, fetchLines]);

    return {
        lines: data,
        loading,
        error,
        fetchLines,
        refetch
    };
};