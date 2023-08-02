import apiUtils from "../apis/apiUtills"

const baseURL = "http://127.0.0.1:8080/employees"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const getEmployees = async (params = "") => {
    try{
        let apiURL;

        if(params)
            apiURL = baseURL+"?cafeId="+params
        else 
            apiURL = baseURL

        const res =await fetch(apiURL, {method: "GET"})
        return apiUtils.apiSuccessHandling(res)
    } catch(err: any){
        throw apiUtils.apiErrorHandling(err)
    }
}

const addEmployee = async (params = {}) => {
    try{
        const res =await fetch(baseURL, 
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(params)
            })  
        return apiUtils.apiSuccessHandling(res)
    } catch(err: any){
        throw apiUtils.apiErrorHandling(err)
    }
}

const apiFuncs = {
    getEmployees: getEmployees,
    addEmployee: addEmployee
}

export default apiFuncs;