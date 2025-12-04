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

export interface Lines {
    id: number;
    linesName: string;
};

export interface GeneralListsResponse<T> {
    success: boolean;
    message: string;
    data: T;
};

class GeneralListsService {
    private tagsEndpoint = API_CONFIG.endpoints.generalLists.tagsList;
    private shiftsEndpoit = API_CONFIG.endpoints.generalLists.shiftsList;
    private linesEndpoint = API_CONFIG.endpoints.generalLists.linesList;

    async getTags(): Promise<GeneralListsResponse<Tags[]>> {
        return apiClient.get<GeneralListsResponse<Tags[]>>(this.tagsEndpoint);
    };

    async getShifts(): Promise<GeneralListsResponse<Shifts>> {
        return apiClient.get<GeneralListsResponse<Shifts>>(this.shiftsEndpoit);
    };

    async getLines(): Promise<GeneralListsResponse<Lines[]>> {
        return apiClient.get<GeneralListsResponse<Lines[]>>(this.linesEndpoint);
    };
};

export const generalListService = new GeneralListsService();