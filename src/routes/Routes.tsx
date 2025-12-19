import { Route, Routes } from "react-router-dom";
import { RealTimeIndex } from "../pages/RealTime/RealTimeIndex";
import { GeneralSummaryIndex } from "../pages/GeneralSummary/GeneralSummaryIndex";
import { StopsIndex } from "../pages/Stops/StopsIndex";
import { DataAnalyticsIndex } from "../pages/DataAnalytics/DataAnalyticsIndex";
import { ReportsIndex } from "../pages/Reports/ReportsIndex";
import { ExportDataIndex } from "../pages/ExportData/ExportDataIndex";
import { RealTimeForm } from "../components/Forms/RealTimeForm/RealTimeForm";
import { HistoricalShifts } from '@/pages/RealTime/HistoricalShifts';

export const MyRoutes = () => {
    return (
        <Routes>
            {/* Real Time */}
            <Route path="/tiempo-real" element={<RealTimeIndex />} />
            <Route path="/nueva-maquina" element={<RealTimeForm />} />
            <Route path="/editar-maquina/:id" element={<RealTimeForm />} />
            <Route path="/turnos-historicos" element={<HistoricalShifts />} />

            <Route path="/resumen-general" element={<GeneralSummaryIndex />} />
            <Route path="/paradas" element={<StopsIndex />} />
            <Route path="/analitica-de-datos" element={<DataAnalyticsIndex />} />
            <Route path="/reportes" element={<ReportsIndex />} />
            <Route path="/exportar-datos" element={<ExportDataIndex />} />
        </Routes>
    );
};