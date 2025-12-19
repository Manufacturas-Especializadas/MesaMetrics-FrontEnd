import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { ArrowDown, ArrowUpAZ, ListFilter, X } from "lucide-react";

export const SortMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortBy, setSortBy] = useState("machineName");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative mb-2" ref={menuRef}>
            <Button
                variant="light"
                className="h-[42px] w-[42px] p-0 flex items-center justify-center rounded-full border-gray-300 text-slate-600 mb-0.5"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ListFilter size={20} />
            </Button>

            {
                isOpen && (
                    <div className="absolute right-0 top-full z-50 w-[300px] bg-white rounded-xl shadow-2xl border border-gray-100
                        overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="font-semibold text-slate-800">
                                Ordenar por
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            <div>
                                <p className="text-xs text-gray-400 mb-2">
                                    Nombre
                                </p>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${sortBy === "machineName" ? "border-blue-400" : "border-gray-300"
                                        }`}>
                                        {sortBy === "machineName" && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="sort"
                                        className="hidden"
                                        checked={sortBy === "machineName"}
                                        onChange={() => setSortBy("machineName")}
                                    />
                                    <span className="text-slate-700 text-sm group-hover:text-blue-600 transition-colors">
                                        Nombre de máquina
                                    </span>
                                </label>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 mb-2 font-medium">
                                    Personalizado
                                </p>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${sortBy === "adminDefined" ? "border-blue-400" : "border-gray-300"
                                        }`}>
                                        {sortBy === "adminDefined" && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="sort"
                                        className="hidden"
                                        checked={sortBy === "adminDefined"}
                                        onChange={() => setSortBy("adminDefined")}
                                    />
                                    <span className="text-slate-700 text-sm group-hover:text-blue-600 transition-colors">
                                        Definido por el administrador
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-2 flex gap-1">
                            <button
                                onClick={() => setOrder("asc")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all 
                                        duration-200 hover:cursor-pointer ${order === "asc"
                                        ? "bg-blue-400 text-white shadow-sm"
                                        : "bg-transparent text-slate-500 hover:bg-gray-200"
                                    }`}
                            >
                                <ArrowUpAZ size={16} /> Ascendente
                            </button>
                            <button
                                onClick={() => setOrder("desc")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all 
                                    duration-200 hover:cursor-pointer ${order === "desc"
                                        ? "bg-blue-400 text-white shadow-sm"
                                        : "bg-transparent text-slate-500 hover:bg-gray-200"
                                    }`}
                            >
                                <ArrowDown size={16} /> Descendente
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};