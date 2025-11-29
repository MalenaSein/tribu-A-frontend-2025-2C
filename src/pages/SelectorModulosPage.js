import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Receipt } from 'lucide-react';
import Header from '../components/Header';

const SelectorModulosPage = () => {
    const navigate = useNavigate();

    const CardModule = ({ icon: Icon, title, description, bgColor, path }) => {
        return (
            <div
                onClick={() => navigate(path)}
                className="group cursor-pointer block p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
                <div className="flex flex-col items-center text-center">
                    <div className={`flex items-center justify-center h-24 w-24 rounded-full ${bgColor} transition-colors duration-300`}>
                        <Icon className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        {title}
                    </h2>
                    <p className="mt-2 text-base text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans">
            <Header
                title="PSA Systems"
                subtitle="Selección de Módulos"
                showBack={true}
                backPath="/"
                backLabel="Cerrar Sesión"
            />

            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                            Seleccione un Módulo
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Bienvenido al Sistema de Gestión Integral
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
                        <CardModule
                            icon={Receipt}
                            title="Módulo de Finanzas"
                            description="Gestión de costos, ingresos y facturación."
                            bgColor="bg-green-600"
                            path="/finanzas/dashboard"
                        />

                        <CardModule
                            icon={Clock}
                            title="Módulo de Carga de Horas"
                            description="Aprobación y reporte de horas por recurso."
                            bgColor="bg-purple-600"
                            path="/manager/home-carga-horas"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SelectorModulosPage;