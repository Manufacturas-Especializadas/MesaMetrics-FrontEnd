import { API_CONFIG } from "@/config/api";
import { apiClient } from "../client";


export interface MachineMetrics {
    machineName: string;
    shift: string;
    status: "produccion" | "detenido" | "offline";
    statusDuration: string;
    availability: string;
    productionTime: string;
    stopTime: string;
    stops: string;
};

class MetricsService {
    private getCurrentMetricsEndpoint = API_CONFIG.endpoints.telemetry.currentMetrics;
    private getActiveSessionEndpoint = API_CONFIG.endpoints.telemetry.activeSessions;

    async getCurrentMetrics(realTimeId: number): Promise<MachineMetrics> {
        const response = await apiClient.get<MachineMetrics>(this.getCurrentMetricsEndpoint(realTimeId))

        if (!response) {
            throw new Error("No se recibieron datos de métricas");
        }

        return response;
    };

    async getActiveSession(): Promise<number[]> {
        return await apiClient.get<number[]>(this.getActiveSessionEndpoint);
    };
};

export const metricsService = new MetricsService();