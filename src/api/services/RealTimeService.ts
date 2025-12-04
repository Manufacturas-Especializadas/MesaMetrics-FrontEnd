import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";

export interface RealTime {
    title: string;
    shiftId: number;
    startTime: string;
    endTime: string;
    lineId: number;
    tagsId: number[];
};

export interface RealTimeResponse {
    success: boolean;
    message: string;
};

class RealTimeService {
    private registerRealTimeEndpoint = API_CONFIG.endpoints.realTime.create;

    async registerRealTime(formData: RealTime): Promise<RealTimeResponse> {
        const payload = {
            ...formData,
            tagsId: Array.isArray(formData.tagsId) ? formData.tagsId : [formData.tagsId]
        };

        return apiClient.post(this.registerRealTimeEndpoint, payload);
    };
};

export const realTimeService = new RealTimeService();