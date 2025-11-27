// traer los proyectos con las tareas

const URL_PROYECTOS = "http://localhost:8080/projects"

async function getData() {
    try {
      const response = await fetch(URL_PROYECTOS, );
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

