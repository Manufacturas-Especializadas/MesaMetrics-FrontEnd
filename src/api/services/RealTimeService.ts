import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";

export interface RealTime {
    title: string;
    shiftId: number;
    startTime: string;
    endTime: string;
    lineId: number;
    machineId: number;
    tagsId: number[];
};

export interface RealTimeResponse {
    success: boolean;
    message: string;
};

class RealTimeService {
    private registerRealTimeEndpoint = API_CONFIG.endpoints.realTime.create;
    private updatedRealTimeEndpoint = API_CONFIG.endpoints.realTime.update;
    private getByIdEnpoint = API_CONFIG.endpoints.realTime.getById;

    async getById(id: number): Promise<any> {
        return apiClient.get(`${this.getByIdEnpoint}${id}`);
    };

    async registerRealTime(formData: RealTime): Promise<RealTimeResponse> {
        const payload = {
            ...formData,
            tagsId: Array.isArray(formData.tagsId) ? formData.tagsId : [formData.tagsId]
        };

        return apiClient.post(this.registerRealTimeEndpoint, payload);
    };

    async updatedRealTime(formData: RealTime, id: number): Promise<RealTimeResponse> {
        const payload = {
            ...formData,
            tagsId: Array.isArray(formData.tagsId) ? formData.tagsId : [formData.tagsId]
        };

        return apiClient.put(`${this.updatedRealTimeEndpoint}${id}`, payload);
    };
};

export const realTimeService = new RealTimeService();