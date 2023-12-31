import apiUtils from "../utils/apiUtills"
import { Error, Employee } from "../interfaces/interface"

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
    } catch(err: Error | any){
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
    } catch(err: Error | any){
        throw apiUtils.apiErrorHandling(err)
    }
}

const editEmployee = async (params: Employee) => {
    try{
        const res =await fetch(baseURL, 
            {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(params)
            })  
        return apiUtils.apiSuccessHandling(res)
    } catch(err: Error | any){
        throw apiUtils.apiErrorHandling(err)
    }
}

const deleteEmployee = async ( params = {}) => {
    try {
        const res = await fetch(`${baseURL}`, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify({ id: params })
        });
        return apiUtils.apiSuccessHandling(res)
    } catch(err: Error | any){
        throw apiUtils.apiErrorHandling(err)
    }
}

const apiFuncs = {
    getEmployees: getEmployees,
    addEmployee: addEmployee,
    editEmployee: editEmployee,
    deleteEmployee: deleteEmployee
}

export default apiFuncs;