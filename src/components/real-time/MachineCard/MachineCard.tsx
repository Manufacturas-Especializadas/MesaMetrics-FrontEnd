import type React from "react";
import { useMachineMetrics } from "@/hooks/useMachineMetrics";
import { StatDisplay } from "../StatDisplay/StatDisplay";
import { TimelineBar } from "../TimelineBar/TimelineBar";
import { MessageSquareWarning, Settings } from "lucide-react";

const CARD_STYLES = {
    produccion: {
        container: "border-green-200 shadow-green-100",
        header: "bg-green-50 text-green-900",
        icon: "bg-green-500 animate-pulse",
        badge: "bg-green-100 text-green-700 border-green-200",
        text: "text-gray-800",
        opacity: "opacity-100"
    },
    detenido: {
        container: "border-orange-200 shadow-orange-100",
        header: "bg-orange-50 text-red-900",
        icon: "bg-orage-500",
        badge: "bg-orange-100 text-orange-700 border-orange-200",
        text: "text-gray-800",
        opacity: "opacity-100"
    },
    offline: {
        container: "border-gray-200 bg-gray-50",
        header: "bg-gray-100 text-gray-400",
        icon: "bg-gray-300",
        badge: "bg-gray-200 text-gray-400 border-gray-300",
        text: "text-gray-400",
        opacity: "opacity-60 grayscale"
    }
};

interface Props {
    realTimeId: number;
}

export const MachineCard: React.FC<Props> = ({ realTimeId }) => {
    const { metrics, loading, error } = useMachineMetrics(realTimeId);

    if (loading) return <MachineCardSkeleton />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-56 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-red-500 font-semibold text-sm">Error de conexión</p>
                <p className="text-xs text-red-400 mt-1">ID: {realTimeId}</p>
            </div>
        );
    }

    const statusKey = (metrics?.status as keyof typeof CARD_STYLES) || "offline";
    const styles = CARD_STYLES[statusKey] || CARD_STYLES.offline;

    return (
        <article className={`flex flex-col rounded-xl border shadow-sm overflow-hidden transition-all duration-500 ${styles.container} ${styles.opacity}`}>
            <header className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 transition-colors duration-500 ${styles.header}`}>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className={`h-3 w-3 rounded-full shrink-0 ${styles.icon}`} />

                    <div className="flex flex-col">
                        <h3 className={`text-lg font-bold leading-tight ${styles.text} line-clamp-1`}>
                            {metrics?.machineName || "Cargando..."}
                        </h3>
                        <span className="text-xs font-medium opacity-80 uppercase tracking-wider">
                            {metrics?.shift || "--"}
                        </span>
                    </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border whitespace-nowrap ${styles.badge}`}>
                    {statusKey === 'offline' ? 'SIN CONEXIÓN' : statusKey}
                    <span className="ml-2 font-mono font-normal opacity-80 border-l pl-2 border-current">
                        {metrics?.statusDuration || "0m"}
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white py-3">
                <StatDisplay value={metrics?.availability} label="Disponibilidad" />
                <StatDisplay value={metrics?.productionTime} label="Tiempo Prod." />
                <StatDisplay value={metrics?.stopTime} label="Tiempo Paro" />
                <StatDisplay value={metrics?.stops} label="Paros" />
            </div>

            <div className="bg-white px-4 pb-4 pt-2">
                <TimelineBar />
            </div>

            <div className="grid grid-cols-5 md:grid-cols-5">
                <div className="flex justify-center mb-3 w-full">
                    <button
                        className="flex items-center justify-center p-1.5 
                        gap-2 rounded-sm text-sm hover:cursor-pointer"
                    >
                        <MessageSquareWarning size={15} />
                        Anotar paradas
                    </button>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div className="">
                    <button className="bg-gray-100 px-1 py-0.5 ml-2.5 rounded-md 
                        hover:cursor-pointer">
                        <Settings />
                    </button>
                </div>
            </div>
        </article>
    );
};

const MachineCardSkeleton = () => (
    <div className="h-60 rounded-xl border border-gray-100 bg-white p-4 animate-pulse flex flex-col gap-4">
        <div className="h-12 bg-gray-100 rounded-lg w-full mb-2"></div>
        <div className="grid grid-cols-4 gap-2 flex-1">
            <div className="bg-gray-50 rounded"></div>
            <div className="bg-gray-50 rounded"></div>
            <div className="bg-gray-50 rounded"></div>
            <div className="bg-gray-50 rounded"></div>
        </div>
        <div className="h-8 bg-gray-100 rounded w-full"></div>
    </div>
);