import { LogOut, Menu } from "lucide-react";
import type React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../assets/logomesa.png";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
interface Props {
  toggleSidebar: () => void;
}

const routeTitles: { [key: string]: string } = {
  "/resumen-general": "Resumen general",
  "/tiempo-real": "Tiempo real",
  "/paradas": "Paradas",
  "/analitica-de-datos": "Analítica de datos",
  "/reportes": "Reportes",
  "/exportar-datos": "Exportar datos",
  "/nueva-maquina": "Registro de nueva maquina",
  "/turnos-historicos": "Turnos históricos",
};

export const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const { logout, user } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTitle = routeTitles[pathname] || "Dashboard";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex h-20 items-center justify-between border-b border-disabled 
            bg-background px-4 lg:px-8"
    >
      <div className="flex items-center gap-4">
        <button
          className="p-1.5 rounded-lg hover:bg-primary-50 hover:cursor-pointer"
          onClick={toggleSidebar}
        >
          <Menu size={24} className="text-text" />
        </button>

        <div className="flex gap-2 items-center justify-center ">
          <img src={Logo} alt="logomesa" className="w-20" />
          <span className="text-2xl font-bold text-primary">METRICS</span>
        </div>

        <div className="hidden lg:flex items-center gap-4 ml-4">
          <span className="h-6 w-px bg-gray-300" aria-hidden="true" />
          <h1 className="text-xl font-semibold text-text">{currentTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-center focus:outline-none group rounded-full hover:cursor-pointer"
          >
            <div
              className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center 
                                      border-2 border-transparent group-hover:border-blue-200 transition-all 
                                      shadow-sm ring-2 ring-transparent group-focus:ring-blue-100"
            >
              <span className="text-blue-700 font-bold text-sm">
                {user?.initials || "US"}
              </span>
            </div>
          </button>

          {isProfileOpen && (
            <div
              className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg ring-1 
            ring-black ring-opacity-5 py-2 transform transition-all duration-200 ease-out origin-top-right 
            z-50 animate-in fade-in zoom-in-95"
            >
              <div className="px-4 py-3 border-b border-gray-100 mb-2 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-900 wrap-break-word">
                  {user?.email || "Usuario"}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {user?.role || "Sin Rol Asignado"}
                </p>
              </div>

              <div className="px-2">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 
                  rounded-md hover:bg-red-50 transition-colors hover:cursor-pointer"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
