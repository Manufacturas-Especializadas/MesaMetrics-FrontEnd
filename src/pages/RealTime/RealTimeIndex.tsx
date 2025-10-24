import { MachineCard } from "../../components/real-time/MachineCard/MachineCard";

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
    return (
        <div className="flex flex-col gap-6">
            <MachineCard {...machine1Data} isActive={true} />

            <MachineCard {...machine2Data} />
        </div>
    );
};