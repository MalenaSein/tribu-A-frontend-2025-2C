import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CostosPage from './pages/CostosPage';
import ReportesPage from './pages/ReportesPage';
import LoginPage from './pages/LoginPage';
import SelectorModulosPage from './pages/SelectorModulosPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          {/* Flujo de Entrada */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/modulos" element={<SelectorModulosPage />} />
          
          {/* Módulo Finanzas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/costos" element={<CostosPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;