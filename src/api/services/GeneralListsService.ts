import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";


export interface Tags {
    id: number;
    tagsName: string;
};

export interface Shifts {
    id: number;
    shiftName: string;
};

export interface GeneralListsResponse<T> {
    success: boolean;
    message: string;
    data: T;
};

class GeneralListsService {
    private tagsEndpoint = API_CONFIG.endpoints.generalLists.tagsList;
    private shiftsEndpoit = API_CONFIG.endpoints.generalLists.shiftsList;

    async getTags(): Promise<GeneralListsResponse<Tags[]>> {
        return apiClient.get<GeneralListsResponse<Tags[]>>(this.tagsEndpoint);
    };

    async getShifts(): Promise<GeneralListsResponse<Shifts>> {
        return apiClient.get<GeneralListsResponse<Shifts>>(this.shiftsEndpoit);
    };
};

export const generalListService = new GeneralListsService();