
const API_BASE_URL = 'http://localhost:8080';


const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
};


async function registrarHoras(registro) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/horas/registrar`, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify(registro)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al registrar horas:', error);
        throw error;
    }
}

async function consultarHoras(codigoEmpleado, semana, mes, anio) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/horas/consultar/${codigoEmpleado}?semana=${semana}&mes=${mes}&anio=${anio}`,
            { ...defaultOptions, method: 'GET' }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al consultar horas:', error);
        throw error;
    }
}

async function modificarHoras(codigoEmpleado, fecha, proyecto, tarea, horasNuevas) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/horas/modificar`, {
            ...defaultOptions,
            method: 'PUT',
            body: JSON.stringify({
                codigoEmpleado,
                fecha,
                proyecto,
                tarea,
                horas: horasNuevas
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al modificar horas:', error);
        throw error;
    }
}


async function obtenerProyectos() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
            ...defaultOptions,
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error;
    }
}

document.getElementById('formHoras')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const registro = {
        codigoEmpleado: document.getElementById('empleado').value,
        fecha: document.getElementById('fecha').value,
        proyecto: document.getElementById('proyecto').value,
        tarea: document.getElementById('tarea').value,
        horas: parseFloat(document.getElementById('horas').value),
        observaciones: document.getElementById('observaciones').value
    };

    try {
        const resultado = await registrarHoras(registro);
        alert('Horas registradas exitosamente!');
        console.log(resultado);
    } catch (error) {
        alert('Error al registrar horas: ' + error.message);
    }
});

export {
    registrarHoras,
    consultarHoras,
    modificarHoras,
    obtenerProyectos
};