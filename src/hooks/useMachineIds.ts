import { generalListService, type MachineIds } from "@/api/services/GeneralListsService";
import { useCallback, useEffect, useState } from "react";

export const useMachineIds = (autoFetch = true) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<MachineIds[]>([]);

    const fetchMachineIds = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const reponse = await generalListService.getMachineIds();

            if (reponse.success) {
                const machineData = Array.isArray(reponse.data)
                    ? reponse.data
                    : [reponse.data];

                setData(machineData);
            } else {
                setError(reponse.message || "Error al obtener los datos");
            }
        } catch (err: any) {
            setError(err?.message || "Error de conexión");
            console.error("Error en traer los datos: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        return fetchMachineIds();
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchMachineIds();
        }
    }, [autoFetch, fetchMachineIds]);

    return {
        machines: data,
        loading,
        error,
        fetchMachineIds,
        refetch
    };
};