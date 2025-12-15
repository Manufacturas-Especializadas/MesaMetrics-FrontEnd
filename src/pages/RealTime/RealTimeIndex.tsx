import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { MachineCard } from "@/components/real-time/MachineCard/MachineCard";
import { StatusMetricCard } from "@/components/real-time/StatusMetricCard/StatusMetricCard";
import { useActiveSession } from "@/hooks/useActiveSession";

export const RealTimeIndex = () => {
    const { session, loading, error } = useActiveSession();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatusMetricCard
                    count={loading ? 0 : session.length}
                    label="Máquinas totales"
                    variant="info"
                />

                <StatusMetricCard count={0} label="Produciendo" variant="success" />
                <StatusMetricCard count={0} label="Detenido" variant="warning" />
                <StatusMetricCard count={0} label="Alerta" variant="danger" />
                <StatusMetricCard count={0} label="Sin Datos" variant="gray" />
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


            {loading && (
                <div className="col-span-full text-center py-10 text-gray-400 animate-pulse">
                    Cargando sesiones activas...
                </div>
            )}

            {error && (
                <div className="col-span-full text-center py-10 text-red-500 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            {!loading && !error && session.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    No hay máquinas activas en este momento.
                </div>
            )}

            {!loading && session.map((id) => (
                <MachineCard
                    key={id}
                    realTimeId={id}
                />
            ))}
        </div>
    );
};