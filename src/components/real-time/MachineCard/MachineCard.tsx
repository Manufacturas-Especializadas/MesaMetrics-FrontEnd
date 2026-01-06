import type React from "react";
import { type MachineMetrics } from "@/api/services/MetricsService";
import { StatDisplay } from "../StatDisplay/StatDisplay";
import { TimelineBar } from "../TimelineBar/TimelineBar";
import { MessageSquareWarning, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CARD_STYLES = {
  produccion: {
    container: "border-green-200 shadow-green-100",
    header: "bg-green-50 text-green-900",
    icon: "bg-green-500 animate-pulse",
    badge: "bg-green-100 text-green-700 border-green-200",
    text: "text-gray-800",
    opacity: "opacity-100",
  },
  detenido: {
    container: "border-orange-200 shadow-orange-100",
    header: "bg-orange-50 text-red-900",
    icon: "bg-orange-500",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    text: "text-gray-800",
    opacity: "opacity-100",
  },
  offline: {
    container: "border-gray-200 bg-gray-50",
    header: "bg-gray-100 text-gray-400",
    icon: "bg-gray-300",
    badge: "bg-gray-200 text-gray-400 border-gray-300",
    text: "text-gray-400",
    opacity: "opacity-60 grayscale",
  },
};

interface StatProps {
  metrics?: MachineMetrics;
  isHistorical?: boolean;
  realTimeId?: number;
}

export const MachineCard: React.FC<StatProps> = ({
  metrics,
  isHistorical = false,
  realTimeId,
}) => {
  const navigate = useNavigate();
  const statusKey = (metrics?.status as keyof typeof CARD_STYLES) || "offline";
  const styles = CARD_STYLES[statusKey] || CARD_STYLES.offline;

  return (
    <article
      className={`flex flex-col rounded-xl border shadow-sm overflow-visible transition-all duration-500 ${styles.container} ${styles.opacity}`}
    >
      <header
        className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 transition-colors duration-500 ${styles.header}`}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className={`h-3 w-3 rounded-full shrink-0 ${styles.icon}`} />
          <div className="flex flex-col">
            <h3
              className={`text-lg font-bold leading-tight ${styles.text} line-clamp-1`}
            >
              {metrics?.machineName || "Cargando..."}
            </h3>
            <span className="text-xs font-medium opacity-80 uppercase tracking-wider">
              {metrics?.shift || "--"}
            </span>
          </div>
        </div>
        <div
          className={`px-4 py-2 rounded-full text-md font-bold uppercase border whitespace-nowrap ${styles.badge}`}
        >
          {statusKey === "offline" ? "SIN CONEXIÓN" : statusKey}
          <span className="ml-2 font-mono font-normal opacity-80 border-l pl-2 border-current">
            {metrics?.statusDuration || "0m"}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white py-3">
        <StatDisplay value={metrics?.availability} label="Disponibilidad" />
        <StatDisplay
          value={metrics?.productionTime}
          label="Tiempo Producción"
        />
        <StatDisplay value={metrics?.stopTime} label="Tiempo en paro" />
        <StatDisplay value={metrics?.stops} label="Paros" />
      </div>

      <div className="bg-white px-4 pb-4 pt-2">
        <TimelineBar segments={metrics?.timeline} />
      </div>

      {!isHistorical && (
        <div className="grid grid-cols-5 md:grid-cols-5 bg-white">
          <div className="flex justify-center mb-3 w-full">
            <button className="flex items-center justify-center p-1.5 gap-2 rounded-sm text-sm hover:cursor-pointer hover:bg-gray-100 transition-colors">
              <MessageSquareWarning size={15} />
              Anotar paradas
            </button>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className="">
            <button
              className="bg-gray-100 px-1 py-0.5 ml-2.5 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() =>
                realTimeId && navigate(`/editar-maquina/${realTimeId}`)
              }
            >
              <Settings />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
