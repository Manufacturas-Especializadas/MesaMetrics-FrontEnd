import type React from "react";
import { MachineStatusBadge, type MachineStatus } from "../MachineStatusBadge/MachineStatusBadge";
import { StatDisplay } from "../StatDisplay/StatDisplay";
import { TimelineBar } from "../TimelineBar/TimelineBar";

interface Props {
    machineName: string;
    shift: string;
    status: MachineStatus;
    statusDuration: string;
    availability: string;
    productionTime: string;
    stopTime: string;
    stops: string;
    isActive?: boolean;
};

export const MachineCard: React.FC<Props> = ({
    machineName,
    shift,
    status,
    statusDuration,
    availability,
    productionTime,
    stopTime,
    stops,
    isActive = false,
}) => {
    const headerBg = isActive ? "bg-primary-50" : "bg-background";

    return (
        <article className="flex flex-col rounded-xl border border-disabled shadow-lg bg-background overflow-hidden">
            <header className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 ${headerBg}`}>
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-text">
                        {machineName}
                    </h3>
                    <span className="rounded-full bg-gray-200 px-3 py-0.5 text-sm font-medium text-text/80">
                        {shift}
                    </span>
                </div>
                <MachineStatusBadge status={status} duration={statusDuration} />
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-disabled bg-white">
                <StatDisplay value={availability} label="Disponibilidad" />
                <StatDisplay value={productionTime} label="Tiempo producción" />
                <StatDisplay value={stopTime} label="Tiempo en par" />
                <StatDisplay value={stops} label="Paros" />

                <div className="bg-white">
                    <TimelineBar />
                </div>
            </div>
        </article>
    );
};