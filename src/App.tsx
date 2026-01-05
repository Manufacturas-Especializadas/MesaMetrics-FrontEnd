import { useState } from "react";
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Sidebar } from "./components/layout/Sidebar/Sidebar";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { MyRoutes } from "./routes/Routes";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, loading } = useAuth();

  const publicRoutes = ["/login", "/register", "/"];
  const currentPath = location.pathname.toLowerCase();

  const isPublicPage = publicRoutes.includes(currentPath);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-200"></div>
      </div>
    );
  }

  if (!isAuthenticated && !isPublicPage) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isPublicPage) {
    return <Navigate to="/resumen-general" replace />;
  }

  if (isPublicPage) {
    return (
      <main className="w-full min-h-screen bg-gray-50">
        <MyRoutes />
      </main>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`
                    pt-24 px-4 pb-8 lg:px-8
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? "lg:pl-72" : "lg:pl-28"} 
                `}
      >
        <div className="max-w-7xl mx-auto">
          <MyRoutes />
        </div>
      </main>
    </div>
  );
};
export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
};
