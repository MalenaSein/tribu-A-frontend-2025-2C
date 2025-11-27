// Cargar desde config si existe, sino usar localhost:8080
const URL_BASE = window.APP_CONFIG?.API_BASE_URL || "http://localhost:8080";

const ENDPOINT_RECURSOS = "/resources"
const ENDPOINT_PROYECTOS = "/api/projects"
const ENDPOINT_TIME_ENTRIES_BY_RESOURCE = "/reports/resources"
const ENDPOINT_REPORT_PROJECTS_RESOURCES_BY_YEAR = "/reports/projects"
const ENDPOINT_PROYECTOS_POR_RECURSO = "/resources"


function getAuthToken() {
    try {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            return user.token || null;
        }
    } catch (error) {
        console.error('Error al obtener token:', error);
    }
    return null;
}

function getAuthHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

let APIClient = {

    getAllResources: async function () {
        return getData(URL_BASE + ENDPOINT_RECURSOS)
    },

    getTimeEntriesByResource: async function(id) {
        return getData(URL_BASE + ENDPOINT_TIME_ENTRIES_BY_RESOURCE + "/" + id)
    },

    getAllProjects: async function() {
        return getData(URL_BASE + ENDPOINT_PROYECTOS)
    },

    getResourcesByProjectAndYear: async function(projectId, year) {
        return getData(URL_BASE + ENDPOINT_REPORT_PROJECTS_RESOURCES_BY_YEAR + "/" + projectId + "/" + year)
    },

    getProjectsByEmployeeId: async function (id) {
        return getData(URL_BASE + ENDPOINT_PROYECTOS + ENDPOINT_RECURSOS + "/" + id)
    },

    getTasksByProjectAndResource: async function (projectId, resourceId) {
        return getData(`${URL_BASE}${ENDPOINT_PROYECTOS}/${projectId}/tasks/${resourceId}`)
    },

    createTimeEntry: async function(data) {
        return postData(`${URL_BASE}/time-entries`, data);
    },

    updateTimeEntry: async function(id, data) {
        return putData(`${URL_BASE}/time-entries/${id}`, data);
    },

    deleteTimeEntry: async function(id) {
        return deleteData(`${URL_BASE}/time-entries/${id}`);
    },

    // ========== MÉTODOS DE AUTENTICACIÓN ==========

    login: async function(employeeCode, password) {
        return postData(`${URL_BASE}/auth/login`, {
            employeeCode,
            password
        });
    },

    logout: async function() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');

    },

    getWeeklyHoursReport: async function(employeeId, startDate, endDate) {
        const url = `${URL_BASE}/api/reports/weekly-hours?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`;
        return getData(url);
    },

    getProjectResourcesReport: async function(projectId, month) {
        // month debe ser formato YYYY-MM-01 (primer día del mes)
        const url = `${URL_BASE}/api/reports/project-resources?projectId=${projectId}&month=${month}`;
        return getData(url);
    }
}

async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('No autorizado. Redirigiendo a login...');
                sessionStorage.clear();
                window.location.href = '/login.html';
                return null;
            }

            const error = new Error(`Error en la petición: ${response.status}`);
            error.status = response.status;
            throw error;
        }

        const result = await response.json();
        console.log("Resultados recibidos:", result);
        return result;
    } catch (error) {
        console.error('Error en getData:', error);
        throw error;
    }
}

async function postData(url, data) {
    const options = {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            // Manejar error 401
            if (response.status === 401) {
                console.error('No autorizado. Redirigiendo a login...');
                sessionStorage.clear();
                window.location.href = '/login.html';
                return null;
            }

            throw new Error(`Error en la petición: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en postData:', error.message);
        throw error;
    }
}

async function putData(url, data) {
    const options = {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 401) {
                console.error('No autorizado. Redirigiendo a login...');
                sessionStorage.clear();
                window.location.href = '/login.html';
                return null;
            }

            throw new Error(`Error en la petición: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en putData:', error.message);
        throw error;
    }
}

async function deleteData(url) {
    const options = {
        method: 'DELETE',
        headers: getAuthHeaders()
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 401) {
                console.error('No autorizado. Redirigiendo a login...');
                sessionStorage.clear();
                window.location.href = '/login.html';
                return null;
            }

            throw new Error(`Error en la petición: ${response.status}`);
        }

        if (response.status === 204) {
            return { success: true };
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en deleteData:', error.message);
        throw error;
    }
}

function createTimeEntryJson(codigoEmpleado, fecha, proyecto, tarea, horas, status, observaciones) {
    return {
        codigoEmpleado: codigoEmpleado,
        fecha: fecha,
        proyecto: proyecto,
        tarea: tarea,
        horas: horas,
        status: status,
        observaciones: observaciones
    }
}

function getCurrentUser() {
    try {
        const userStr = sessionStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return null;
    }
}


function isAuthenticated() {
    return sessionStorage.getItem('isAuthenticated') === 'true';
}

