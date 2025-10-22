import {
    BarChart3,
    ChevronDown,
    ChevronUp,
    Clock,
    Download,
    FileText,
    LayoutDashboard,
    PauseCircle,
    Settings
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavItemProps = {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    href: string;
    isSidebarOpen: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, href, isSidebarOpen }) => {
    return (
        <li>
            <Link
                to={href}
                className={`
                    flex items-center gap-3 rounded-lg transition-colors duration-200
                    ${active
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-text/70 hover:bg-primary-50 hover:text-text'
                    }
                    ${isSidebarOpen ? 'px-4 py-2.5' : 'p-2.5 justify-center'}
                `}
            >
                <Icon size={20} />
                <span className={!isSidebarOpen ? 'hidden' : 'whitespace-nowrap'}>{label}</span>
            </Link>
        </li>
    );
};

interface Props {
    isSidebarOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ isSidebarOpen }) => {
    const [configOpen, setConfigOpen] = useState(false);

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <aside
            className={`
                fixed left-0 z-30 flex flex-col justify-between
                border-r border-disabled bg-background p-4
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'w-64' : 'w-20'}
                top-20 h-[calc(100vh-5rem)]
            `}
        >
            <div>
                <nav>
                    <ul className="flex flex-col gap-1">
                        <NavItem
                            icon={LayoutDashboard}
                            label="Resumen general"
                            href="/resumen-general"
                            isSidebarOpen={isSidebarOpen}
                            active={pathname === "/resumen-general"}
                        />
                        <NavItem
                            icon={Clock}
                            label="Tiempo real"
                            href="/tiempo-real"
                            isSidebarOpen={isSidebarOpen}
                            active={pathname === "/tiempo-real"}
                        />
                        <NavItem
                            icon={PauseCircle}
                            label="Paradas"
                            href="/paradas"
                            isSidebarOpen={isSidebarOpen}
                            active={pathname === "/paradas"}
                        />
                        <NavItem
                            icon={BarChart3}
                            label="Analítica de datos"
                            href="/analitica-de-datos"
                            isSidebarOpen={isSidebarOpen}
                            active={pathname === "/analitica-de-datos"}
                        />
                        <NavItem
                            icon={FileText}
                            label="Reportes"
                            href="/reportes"
                            isSidebarOpen={isSidebarOpen}
                            active={pathname === "/reportes"}
                        />
                        <NavItem
                            icon={Download}
                            label="Exportar datos"
                            href="/exportar-datos"
                            isSidebarOpen={isSidebarOpen}
                            active={pathname === "/exportar-datos"}
                        />

                        <li>
                            <button
                                onClick={() => setConfigOpen(!configOpen)}
                                className={`
                                flex w-full items-center gap-3 rounded-lg text-text/70
                                hover:bg-primary-50 hover:text-text transition-colors duration-200
                                ${isSidebarOpen ? 'px-4 py-2.5 justify-between' : 'p-2.5 justify-center'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Settings size={20} />
                                    <span className={!isSidebarOpen ? 'hidden' : 'whitespace-nowrap'}>Configuraciones</span>
                                </div>
                                <div className={!isSidebarOpen ? 'hidden' : ''}>
                                    {configOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};