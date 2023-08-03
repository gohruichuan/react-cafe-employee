import apiUtils from "../utils/apiUtills"
import { Error, Cafe } from "../interfaces/interface"

const baseURL = "http://127.0.0.1:8080/cafes"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const getCafes = async ( params = "" ) => {
    try {
        const res = await fetch(`${baseURL}?location=` + params, { method: "GET" });
        return await res.json();
    } catch (err) {
        throw err;
    }
}

const addCafe = async ( params = {} ) => {
    try {
        const res = await fetch(`${baseURL}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params)
        });
        return apiUtils.apiSuccessHandling(res)
    } catch(err: Error | any) {
        throw apiUtils.apiErrorHandling(err)
    }
}

const editCafe = async ( params: Cafe) => {
    try {
        const res = await fetch(`${baseURL}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(params)
        });
        return apiUtils.apiSuccessHandling(res)
    } catch(err: Error | any){
        throw apiUtils.apiErrorHandling(err)
    }
}

const deleteCafe = async ( params = {}) => {
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

const functions = {
    "getCafes": getCafes,
    "addCafe": addCafe,
    "editCafe": editCafe,
    "deleteCafe": deleteCafe
}
export default functions;