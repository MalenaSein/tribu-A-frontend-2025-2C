import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

// IDs de roles (deben coincidir con tu backend)
const MANAGER_ROLE_ID = '1f14a491-e26d-4092-86ea-d76f20c165d1';
const DEVELOPER_ROLE_ID = '6e6ecd47-fa18-490e-b25a-c9101a398b6d';

const LoginPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [employeeCode, setEmployeeCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState('');

  // ========================================
  // MAPEAR ROL ID A NOMBRE
  // ========================================
  const mapRolIdToRole = (rolId) => {
    if (!rolId) return 'DEVELOPER';

    if (rolId === MANAGER_ROLE_ID) {
      return 'MANAGER';
    } else if (rolId === DEVELOPER_ROLE_ID) {
      return 'DEVELOPER';
    } else {
      console.warn('⚠️ Rol desconocido:', rolId, '- Asignando DEVELOPER');
      return 'DEVELOPER';
    }
  };

  // ========================================
  // REDIRIGIR POR ROL
  // ========================================
  const redirectByRole = (role, employeeCode) => {
    console.log('🔀 Redirigiendo por rol:', role);

    if (role === 'MANAGER') {
      console.log('➡️ Redirigiendo a Selector de Módulos');
      navigate('/modulos');
    } else {
      console.log('➡️ Redirigiendo a Selección de Proyectos');
      navigate('/desarrollador/seleccion-proyectos');
    }
  };

  // ========================================
  // GUARDAR SESIÓN
  // ========================================
  const saveUserSession = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('isAuthenticated', 'true');
    console.log('✅ Sesión guardada:', userData);
  };

  // ========================================
  // CARGAR EMPLEADOS DESDE API
  // ========================================
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        console.log('📄 Cargando empleados desde:', `${API_BASE_URL}/api/resources`);

        const response = await fetch(`${API_BASE_URL}/api/resources`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Empleados cargados:', data.length);

        setEmployees(data);
        setLoadingEmployees(false);
      } catch (error) {
        console.error('❌ Error al cargar empleados:', error);
        setError('No se pudo cargar la lista de empleados. Verifique el backend.');
        setLoadingEmployees(false);
      }
    };

    // Verificar si ya está autenticado
    const isAuth = sessionStorage.getItem('isAuthenticated');
    if (isAuth === 'true') {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user?.employeeCode && user?.role) {
        console.log('👤 Ya autenticado, redirigiendo...');
        redirectByRole(user.role, user.employeeCode);
        return;
      }
    }

    loadEmployees();
  }, []);

  // ========================================
  // HANDLER DEL LOGIN
  // ========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!employeeCode) {
      setError('Por favor seleccione un empleado');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Buscar el empleado seleccionado
      const employee = employees.find(emp => emp.id === employeeCode);

      if (!employee) {
        throw new Error('Empleado no encontrado');
      }

      console.log('👤 Empleado seleccionado:', employee);

      // Mapear rol
      const role = mapRolIdToRole(employee.rolId);
      console.log('✅ Rol mapeado:', role);

      // Crear datos de usuario
      const userData = {
        id: employee.id,
        employeeCode: employee.id,
        name: `${employee.nombre} ${employee.apellido}`,
        role: role,
        token: `hardcoded-token-${employee.id}`,
        rolId: employee.rolId
      };

      // Guardar sesión
      saveUserSession(userData);

      // Redirigir por rol
      setTimeout(() => {
        redirectByRole(role, employee.id);
      }, 300);

    } catch (error) {
      console.error('💥 Error al procesar login:', error);
      setError('Error al procesar el login: ' + error.message);
      setLoading(false);
    }
  };

  // ========================================
  // RENDER
  // ========================================
  return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">PSA</h1>
            <p className="text-gray-500 mt-1">Sistema de Gestión</p>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900">Bienvenido de nuevo</h2>

          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="employeeCode">
                Seleccione su Usuario
              </label>
              <div className="mt-1">
                {loadingEmployees ? (
                    <div className="flex items-center justify-center py-2">
                      <Loader className="w-5 h-5 animate-spin text-blue-600" />
                      <span className="ml-2 text-sm text-gray-500">Cargando empleados...</span>
                    </div>
                ) : (
                    <select
                        id="employeeCode"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
                        required
                        value={employeeCode}
                        onChange={(e) => setEmployeeCode(e.target.value)}
                        disabled={loading}
                    >
                      <option value="">Seleccione su usuario</option>
                      {employees.map(emp => {
                        const shortId = emp.id.substring(0, 8);
                        const role = mapRolIdToRole(emp.rolId);
                        return (
                            <option key={emp.id} value={emp.id}>
                              {shortId}... - {emp.nombre} {emp.apellido} ({role})
                            </option>
                        );
                      })}
                    </select>
                )}
              </div>
              {employees.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    {employees.length} empleados disponibles
                  </p>
              )}
            </div>

            <div>
              <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading || loadingEmployees}
              >
                {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                ) : (
                    'INGRESAR'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;