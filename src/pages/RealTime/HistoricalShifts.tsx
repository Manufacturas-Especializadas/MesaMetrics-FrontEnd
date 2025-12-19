import { Button } from "@/components/Button/Button";
import { CustomDatePicker } from "@/components/Inputs/CustomDatePicker";
import { MachineCard } from "@/components/real-time/MachineCard/MachineCard";
import { SortMenu } from "@/components/SortMenu/SortMenu";
import { useHistoricalMetrics } from "@/hooks/useHistoricalMetrics";
import { ArrowLeft, CalendarX } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HistoricalShifts = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>(new Date());
    const [selectedShift, setSelectedShift] = useState<"morning" | "night">("morning");

    const { metricsList, loading, error } = useHistoricalMetrics(date, selectedShift);

    return (
        <div className="flex flex-col gap-6 w-full p-4">
            <div>
                <Button
                    variant="light"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600 border-slate-300 hover:bg-slate-50"
                    onClick={() => navigate("/tiempo-real")}
                >
                    <ArrowLeft size={18} />
                    Regresar
                </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div className="w-auto">
                    <CustomDatePicker
                        label="Selecciona fecha"
                        value={date}
                        onChange={setDate}
                    />
                </div>

                <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden 
                    h-[42px] mb-3">
                    <button
                        onClick={() => setSelectedShift("morning")}
                        className={`px-6 h-full text-sm font-medium transition-colors duration-200 hover:cursor-pointer
                            ${selectedShift === "morning"
                                ? "bg-blue-400 text-white"
                                : "bg-white text-slate-600 hover:bg-gray-50"
                            }`}
                    >
                        Mañana
                    </button>
                    <div className="w-px h-full bg-gray-300"></div>
                    <button
                        onClick={() => setSelectedShift("night")}
                        className={`px-6 h-full text-sm font-medium transition-colors duration-200 hover:cursor-pointer 
                                ${selectedShift === "night"
                                ? "bg-blue-400 text-white"
                                : "bg-white text-slate-600 hover:bg-gray-50"
                            }`}
                    >
                        Noche
                    </button>
                </div>

                <SortMenu />
            </div>

            <div className="mt-4">
                {
                    loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-48 bg-gray-100 rounded-xl w-full"></div>
                            <div className="h-48 bg-gray-100 rounded-xl w-full"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
                            {error}
                        </div>
                    ) : metricsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <CalendarX size={48} className="mb-2 opacity-50" />
                            <p>No se encontrarón registros para esta fecha y turno</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {
                                metricsList.map((metric, index) => (
                                    <MachineCard
                                        key={index}
                                        isHistorical={true}
                                        metrics={metric}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};