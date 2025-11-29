import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ========================================
// PÁGINAS COMPARTIDAS
// ========================================
import LoginPage from './pages/LoginPage';
import SelectorModulosPage from './pages/SelectorModulosPage';

// ========================================
// MÓDULO FINANZAS (del otro grupo)
// ========================================
import Dashboard from './pages/Dashboard';
import CostosPage from './pages/CostosPage';
import ReportesPage from './pages/ReportesPage';

// ========================================
// MÓDULO CARGA DE HORAS - MANAGER
// ========================================
import TimeEntryDashboard from './pages/TimeEntryDashboard';
import ApproveHours from './pages/ApproveHours';
import ReportsHome from './pages/ReportsHome';
import WeeklyHoursResourceSelection from './pages/WeeklyHoursResourceSelection';
import ResourceWeeklyHoursReport from './pages/ResourceWeeklyHoursReport';
import ProjectCostSelection from './pages/ProjectCostSelection';
import ProjectCostReport from './pages/ProjectCostReport';

// ========================================
// MÓDULO CARGA DE HORAS - DEVELOPER
// ========================================
import ProjectSelection from './pages/ProjectSelection';
import HourEntry from './pages/HourEntry';
import MyHours from './pages/MyHours';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Routes>
            {/* ================================================== */}
            {/* RUTA DE ENTRADA - LOGIN                           */}
            {/* ================================================== */}
            <Route path="/" element={<LoginPage />} />

            {/* ================================================== */}
            {/* SELECTOR DE MÓDULOS (solo para MANAGER)           */}
            {/* ================================================== */}
            <Route path="/modulos" element={<SelectorModulosPage />} />

            {/* ================================================== */}
            {/* MÓDULO FINANZAS                                    */}
            {/* Rutas del módulo del otro grupo                    */}
            {/* ================================================== */}
            <Route path="/finanzas/dashboard" element={<Dashboard />} />
            <Route path="/costos" element={<CostosPage />} />
            <Route path="/reportes" element={<ReportesPage />} />

            {/* ================================================== */}
            {/* MÓDULO CARGA DE HORAS - MANAGER                    */}
            {/* ================================================== */}

            {/* Home del módulo de carga de horas */}
            <Route path="/manager/home-carga-horas" element={<TimeEntryDashboard />} />

            {/* Aprobar horas cargadas por desarrolladores */}
            <Route path="/manager/aprobar-horas" element={<ApproveHours />} />

            {/* Reportes - Home */}
            <Route path="/manager/reportes" element={<ReportsHome />} />

            {/* Reporte de Horas Semanales */}
            <Route
                path="/manager/reportes/horas-semanales"
                element={<WeeklyHoursResourceSelection />}
            />
            <Route
                path="/manager/reportes/reporte-recurso"
                element={<ResourceWeeklyHoursReport />}
            />

            {/* Reporte de Costos por Proyecto */}
            <Route
                path="/manager/reportes/costos-proyecto"
                element={<ProjectCostSelection />}
            />
            <Route
                path="/manager/reportes/reporte-costos"
                element={<ProjectCostReport />}
            />

            {/* ================================================== */}
            {/* MÓDULO CARGA DE HORAS - DEVELOPER                  */}
            {/* ================================================== */}

            {/* Selección de proyecto */}
            <Route
                path="/desarrollador/seleccion-proyectos"
                element={<ProjectSelection />}
            />

            {/* Carga de horas */}
            <Route
                path="/desarrollador/carga-horas"
                element={<HourEntry />}
            />

            <Route path="/desarrollador/mis-horas" element={<MyHours />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;