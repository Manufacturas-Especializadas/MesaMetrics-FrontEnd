import { useCallback, useEffect, useState } from "react";
import { generalListService, type Tags } from "../api/services/GeneralListsService";

export const useTags = (autoFetch = true) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Tags[]>([]);

    const fetchTags = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await generalListService.getTags();

            if (response.success) {
                const tagsData = Array.isArray(response.data)
                    ? response.data
                    : [response.data];

                setData(tagsData);
            } else {
                setError(response.message || "Error al obtener la data");
            }
        } catch (err: any) {
            setError(err?.message || "Error de conexión");
            console.error("Error en traer los datos: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        return fetchTags();
    }, [fetchTags]);

    useEffect(() => {
        if (autoFetch) {
            fetchTags();
        }
    }, [autoFetch, fetchTags]);

    return {
        tags: data,
        loading,
        error,
        fetchTags,
        refetch
    };
};