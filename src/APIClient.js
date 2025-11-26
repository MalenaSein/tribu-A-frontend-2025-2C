const URL_BASE = "http://localhost:8080"
const ENDPOINT_RECURSOS = "/resources"
const ENDPOINT_TIME_ENTRIES_BY_RESOURCE = "/reports/resources"

let APIClient = {
    getAllResources : async function () {
        return getData(URL_BASE +  ENDPOINT_RECURSOS)
    },

    getTimeEntriesByResource: async function(id) {
        return getData(URL_BASE + ENDPOINT_TIME_ENTRIES_BY_RESOURCE + "/" +id)
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