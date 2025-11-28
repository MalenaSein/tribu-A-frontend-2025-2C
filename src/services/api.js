const BASE_URL = "http://localhost:8080/api"; 

export const ApiService = {

    // 1. Obtener Proyectos (GET)
    obtenerProyectos: async () => {
        try {
            const response = await fetch(`${BASE_URL}/proyectos`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudieron cargar los proyectos.`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error de red o servidor:", error);
            throw error; // Re-lanza el error para que la página lo maneje (muestre alerta, etc.)
        }
    },

    // 2. Obtener Costos (GET)
    obtenerCostosVigentes: async () => {
        try {
            const response = await fetch(`${BASE_URL}/costos-rol`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudieron cargar los costos.`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error de red o servidor:", error);
            throw error;
        }
    },

    // 3. Crear Costo (POST)
    crearCosto: async (nuevoCosto) => {
        try {
            const response = await fetch(`${BASE_URL}/costos-rol`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCosto)
            });
            
            if (!response.ok) {
                const errorBody = await response.text(); // Intentamos leer el error del backend
                throw new Error(`Error ${response.status}: ${errorBody || 'No se pudo guardar el costo.'}`);
            }
            
            // Si el backend devuelve JSON, lo retornamos
            // Si devuelve vacío (200 OK sin body), retornamos true
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return await response.json();
            } else {
                return { success: true };
            }

        } catch (error) {
            console.error("Error guardando costo:", error);
            throw error;
        }
    }, 

    // 4. Actualizar Costo (PUT)
    actualizarCosto: async (id, datos) => {
        try {
            const response = await fetch(`${BASE_URL}/costos-rol/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            if (!response.ok) throw new Error("Error al actualizar");
            return await response.json();
        } catch (error) {
            console.error("Error actualizando:", error);
            throw error;
        }
    },

    // 5. Reporte Calculado (GET)
    obtenerReporteMensual: async () => {
        try {
            const response = await fetch(`${BASE_URL}/reportes/mensual`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo generar el reporte`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error obteniendo reporte:", error);
            throw error;
        }
    }
};