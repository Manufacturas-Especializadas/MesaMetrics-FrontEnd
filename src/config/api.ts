const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
    baseUrl: API_BASE_URL,
    hubUrl: `${API_BASE_URL.replace("/api", "")}/machineHub`,
    endpoints: {
        auth: {
            register: "/api/Auth/Register",
            login: "/api/Auth/Login"
        },
        realTime: {
            create: "/api/RealTime/RegisterRealTime",
            update: "/api/RealTime/UpdateRealTime/",
            getById: "/api/RealTime/GetRealTimeById/"
        },
        telemetry: {
            currentMetrics: (id: number) => `/api/Telemetry/CurrentMetrics/${id}`,
            activeSessions: "/api/Telemetry/GetActiveSessions",
            dashboardStats: "/api/Telemetry/DashboardStats",
            getHistory: "/api/Telemetry/History"
        },
        generalLists: {
            tagsList: "/api/GeneralList/GetTags",
            shiftsList: "/api/GeneralList/GetShifts",
            linesList: "/api/GeneralList/GetLines",
            machineIdsLists: "/api/GeneralList/GetMachineIds"
        }
    }
};