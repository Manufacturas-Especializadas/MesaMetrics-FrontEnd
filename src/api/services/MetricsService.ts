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
    timeline: TimelineSegment[];
};

export interface TimelineSegment {
    status: "produccion" | "detenido" | "offline";
    startTime: string;
    endTime: string;
    duration: string;
};

export interface DashboardStats {
    produciendo: number;
    detenido: number;
    alerta: number;
    sinDatos: number;
    sinTurno: number;
    total: number;
};

class MetricsService {
    private getCurrentMetricsEndpoint = API_CONFIG.endpoints.telemetry.currentMetrics;
    private getActiveSessionEndpoint = API_CONFIG.endpoints.telemetry.activeSessions;
    private getDashboardStatsEndpoint = API_CONFIG.endpoints.telemetry.dashboardStats;
    private getHistoryEndpoint = API_CONFIG.endpoints.telemetry.getHistory;

    async getHistoricalMetrcis(date: Date, shift: "morning" | "night"): Promise<MachineMetrics[]> {
        const params = new URLSearchParams({
            date: date.toISOString(),
            shift: shift
        });

        const url = `${this.getHistoryEndpoint}?${params.toString()}`;

        const response = await apiClient.get<MachineMetrics[]>(url);

        if (!response) {
            return [];
        }

        return response;
    };

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

    async getDashboardStats(): Promise<DashboardStats> {
        return await apiClient.get<DashboardStats>(this.getDashboardStatsEndpoint);
    };
};

export const metricsService = new MetricsService();