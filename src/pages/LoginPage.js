import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulamos validación y redirigimos
    navigate('/modulos');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">PSA</h1>
          <p className="text-gray-500 mt-1">Sistema de Gestión</p>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900">Bienvenido de nuevo</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="Código de empleado">Código de empleado</label>
            <div className="mt-1">
              <input 
                autoComplete="Código de empleado" 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" 
                id="Código de empleado" 
                name="Código de empleado" 
                required 
                type="Código de empleado"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Contraseña</label>
            <div className="mt-1">
              <input 
                autoComplete="current-password" 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" 
                id="password" 
                name="password" 
                required 
                type="password"
              />
            </div>
          </div>
          
          <div className="text-sm text-right">
            <a className="font-medium text-blue-600 hover:text-blue-500" href="#">
              Olvidé mi contraseña
            </a>
          </div>
          
          <div>
            <button 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" 
              type="submit"
            >
              INGRESAR
            </button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2025 PSA Systems
        </p>
      </div>
    </div>
  );
};

export default LoginPage;