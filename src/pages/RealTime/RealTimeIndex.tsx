import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { MachineCard } from "../../components/real-time/MachineCard/MachineCard";
import { StatusMetricCard } from "../../components/real-time/StatusMetricCard/StatusMetricCard";

const machine1Data = {
    machineName: "LINEA 1 CORTADORA CUT OFF 124",
    shift: "Mañana",
    status: "produciendo" as const,
    statusDuration: "19m",
    availability: "53%",
    productionTime: "1h 33m",
    stopTime: "1h 23m",
    stops: "4",
};

const machine2Data = {
    machineName: "LINEA 2 PRENSA HIDRÁULICA 007",
    shift: "Tarde",
    status: "detenido" as const,
    statusDuration: "3h 32m",
    availability: "7%",
    productionTime: "0h 36m",
    stopTime: "8h 1m",
    stops: "4",
};

export const RealTimeIndex = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatusMetricCard count={6} label="Máquinas totals" variant="info" />
                <StatusMetricCard count={0} label="Produciendo" variant="success" />
                <StatusMetricCard count={2} label="Detenido" variant="warning" />
                <StatusMetricCard count={0} label="Alerta" variant="danger" />
                <StatusMetricCard count={4} label="Sin Datos" variant="gray" />
                <StatusMetricCard count={0} label="Sin Turno" variant="primary" />
            </div>

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="light">
                        Ordenar por
                    </Button>
                    <Button variant="light">
                        Filtrar
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="light">
                        Turnos hístoricos
                    </Button>
                    <Button variant="light" onClick={() => navigate("/nueva-maquina")}>
                        Nueva maquina
                    </Button>
                </div>
            </div>

            <MachineCard {...machine1Data} isActive={true} />

            <MachineCard {...machine2Data} isActive={true} />
        </div>
    );
};