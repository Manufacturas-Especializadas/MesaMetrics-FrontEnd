import { AlertTriangle, Clock, PauseCircle, XCircle } from "lucide-react";
import type React from "react";

export type MachineStatus = "produciendo" | "detenido" | "sin datos";

interface Props {
    status: MachineStatus;
    duration: string;
};

const statusConfig = {
    produciendo: {
        label: "Produciendo",
        icon: Clock,
        className: "bg-green-600 text-white"
    },
    detenido: {
        label: "Detenido",
        icon: PauseCircle,
        className: "bg-yellow-500 text-white"
    },
    alerta: {
        label: "Alerta",
        icon: AlertTriangle,
        className: "bg-red-600 text-white"
    },
    "sin datos": {
        label: "Sin Datos",
        icon: XCircle,
        className: "bg-gray-400 text-white"
    }
};

export const MachineStatusBadge: React.FC<Props> = ({ status, duration }) => {

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${config.className}`}
        >
            <Icon size={18} />
            <span>{duration} | {config.label}</span>
        </div>
    );
};