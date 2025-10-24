import { useState } from "react";
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Sidebar } from "./components/layout/Sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes/Routes";

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div className="bg-primary-50 min-h-screen">
          <Navbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <Sidebar isSidebarOpen={isSidebarOpen} />
          <main
            className={`
            pt-20 
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'pl-64' : 'pl-20'}
          `}
          >
            <div className="p-4 lg:p-8">
              <MyRoutes />
            </div>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
};