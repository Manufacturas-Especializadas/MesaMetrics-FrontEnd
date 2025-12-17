const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
    baseUrl: API_BASE_URL,
    hubUrl: `${API_BASE_URL.replace("/api", "")}/machineHub`,
    endpoints: {
        realTime: {
            create: "/api/RealTime/RegisterRealTime"
        },
        telemetry: {
            currentMetrics: (id: number) => `/api/Telemetry/CurrentMetrics/${id}`,
            activeSessions: "/api/Telemetry/GetActiveSessions",
            dashboardStats: "/api/Telemetry/DashboardStats"
        },
        generalLists: {
            tagsList: "/api/GeneralList/GetTags",
            shiftsList: "/api/GeneralList/GetShifts",
            linesList: "/api/GeneralList/GetLines"
        }
    }
};