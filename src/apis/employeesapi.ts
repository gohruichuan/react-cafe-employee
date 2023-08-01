const baseURL = "http://127.0.0.1:8080/employees"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const getEmployees = async (params = "") => {
    try{
        let apiURL;

        if(params)
            apiURL = baseURL+"?cafe"+params
        else 
            apiURL = baseURL

        const res =await fetch(apiURL, {method: "GET"})
        return await res.json()
    } catch(err){
        throw err;
    }
}

const apiFuncs = {
    getEmployees: getEmployees
}

export default apiFuncs;