import {
    Menu
} from "lucide-react";
import type React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../assets/logomesa.png";
interface Props {
    toggleSidebar: () => void;
};

const routeTitles: { [key: string]: string } = {
    "/resumen-general": "Resumen general",
    "/tiempo-real": "Tiempo real",
    "/paradas": "Paradas",
    "/analitica-de-datos": "Analítica de datos",
    "/reportes": "Reportes",
    "/exportar-datos": "Exportar datos",
    "/nueva-maquina": "Registro de nueva maquina",
    "/turnos-historicos": "Turnos históricos"
};

export const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const currentTitle = routeTitles[pathname] || "Dashboard";

    return (
        <header className="fixed top-0 left-0 right-0 z-40 flex h-20 items-center justify-between border-b border-disabled 
            bg-background px-4 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    className="p-1.5 rounded-lg hover:bg-primary-50 hover:cursor-pointer"
                    onClick={toggleSidebar}
                >
                    <Menu size={24} className="text-text" />
                </button>

                <div className="flex gap-2 items-center justify-center ">
                    <img
                        src={Logo}
                        alt="logomesa"
                        className="w-20"
                    />
                    <span className="text-2xl font-bold text-primary">
                        METRICS
                    </span>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <span className="h-6 w-px bg-disabled" aria-hidden="true" />
                    <h1 className="text-xl font-semibold text-text">
                        {currentTitle}
                    </h1>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
                {/* <HeaderButton icon={Monitor}>Versión TV</HeaderButton>
                <HeaderButton icon={HardDrive}>
                    1 Grupo de Máquinas 6
                    <ChevronDown size={16} className="text-cancel" />
                </HeaderButton>

                <div className="flex items-center rounded-full bg-gray-100 p-0.5 text-sm font-medium">
                    <span className="rounded-full bg-primary px-3 py-1 text-white shadow">
                        AM
                    </span>
                    <span className="px-3 py-1 text-cancel">PM</span>
                </div> */}
            </div>
        </header>
    );
};