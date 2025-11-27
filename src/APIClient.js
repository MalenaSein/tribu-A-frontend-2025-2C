const URL_BASE = "http://localhost:8080"
const ENDPOINT_RECURSOS = "/resources"
const ENDPOINT_PROYECTOS = "/projects"
const ENDPOINT_TIME_ENTRIES_BY_RESOURCE = "/reports/resources"
const ENDPOINT_REPORT_PROJECTS_RESOURCES_BY_YEAR = "/reports/projects"
const ENDPOINT_PROYECTOS_POR_RECURSO = "/resources"

let APIClient = {
    getAllResources : async function () {
        return getData(URL_BASE +  ENDPOINT_RECURSOS)
    },

    getTimeEntriesByResource: async function(id) {
        return getData(URL_BASE + ENDPOINT_TIME_ENTRIES_BY_RESOURCE + "/" +id)
    },

    getAllProjects: async function() {
        return getData(URL_BASE + ENDPOINT_PROYECTOS )
    },

    getResourcesByProjectAndYear: async function(projectId, year) {
        return getData(URL_BASE + ENDPOINT_REPORT_PROJECTS_RESOURCES_BY_YEAR + "/" + projectId + "/" + year)
    },

    getProjectsByEmployeeId: async function (id) {
      return getData(URL_BASE + ENDPOINT_PROYECTOS + ENDPOINT_RECURSOS + "/" + id)
      // return getData(URL_BASE + ENDPOINT_PROYECTOS )
      
    },
    getTasksByProjectAndResource: async function (projectId, resourceId) {
      return getData(`${URL_BASE}${ENDPOINT_PROYECTOS}/${projectId}/tasks/${resourceId}`)
    },

    createTimeEntry: async function(data) {
      return postData(`${URL_BASE}/time-entries`, data);
    }

}



async function getData(url) {
    try {
      const response = await fetch(url );
      if (!response.ok) {
        throw new Error(`hubo un error, Response status: ${response.status}`);
      }
  
      const result = await response.json();
    //   console.log("los resultados son...", result);
      return result;
    } catch (error) {
      console.error(error.message);
    }
}

async function postData(url, data) {
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`hubo un error, Response status: ${response.status}`);
    }

    const result = await response.json();
  //   console.log("los resultados son...", result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

function createTimeEntryJson(codigoEmpleado, fecha, proyecto, tarea, horas, status, observaciones) {
  return {
    codigoEmpleado: codigoEmpleado,
    // fechaHoraCarga: fechaHoraCarga ,
    fecha: fecha,
    proyecto: proyecto,
    tarea: tarea,
    horas: horas,
    status: status,
    observaciones: observaciones
  }
}