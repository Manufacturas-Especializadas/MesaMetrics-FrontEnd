import { useEffect, useState, useRef } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnectionState, HubConnection } from '@microsoft/signalr';
import { metricsService, type MachineMetrics } from '../api/services/MetricsService';
import { API_CONFIG } from '../config/api';

export const useMachineMetrics = (realTimeId: number) => {
    const [metrics, setMetrics] = useState<MachineMetrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const connectionRef = useRef<HubConnection | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchInitialData = async () => {
            try {
                const data = await metricsService.getCurrentMetrics(realTimeId);
                if (isMounted) {
                    setMetrics(data);
                    setLoading(false);
                }
            } catch (err: any) {
                console.error("Error fetching initial metrics:", err);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchInitialData();

        const connection = new HubConnectionBuilder()
            .withUrl(API_CONFIG.hubUrl, {
                accessTokenFactory: () => localStorage.getItem("token") || ""
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Warning)
            .build();

        connectionRef.current = connection;

        const startConnection = async () => {
            try {
                if (connection.state === HubConnectionState.Disconnected) {
                    await connection.start();

                    if (isMounted && (connection.state as HubConnectionState) === HubConnectionState.Connected) {
                        await connection.invoke("JoinGroup", realTimeId.toString());
                    }
                }
            } catch (err: any) {
                if (err.toString().includes("negotiation")) return;
                console.error("❌ Error SignalR:", err);
                if (isMounted) setError("Conexión inestable");
            }
        };

        startConnection();

        connection.on("ReceiveMachineMetrics", (updatedMetrics: MachineMetrics) => {
            if (isMounted) {
                setMetrics(updatedMetrics);
            }
        });

        return () => {
            isMounted = false;
            if (connection.state === HubConnectionState.Connected) {
                connection.stop().catch(() => { });
            }
        };

    }, [realTimeId]);

    return { metrics, loading, error };
};