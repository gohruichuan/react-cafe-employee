import { ApiSuccess, ApiError } from "../interfaces/interface";

const apiSuccessHandling = async (res: ApiSuccess) => {
    if(res.status === 200) return await res.json()
    else return apiErrorHandling(await res.json())
}

const apiErrorHandling = (err: ApiError) => {
    if(err.details?.length){
        throw err.details[0].message;
    } else if(err.errors?.length){
        throw err.errors[0].message;
    }
}

const apiFunctions = {
    apiSuccessHandling: apiSuccessHandling,
    apiErrorHandling: apiErrorHandling
}
export default apiFunctions;