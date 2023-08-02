const apiSuccessHandling = async (res: { status: number; json: () => any; }) => {
    if(res.status === 200) return await res.json()
    else throw await res.json()
}

const apiErrorHandling = (err: { details: string | any[]; errors: string | any[]; }) => {
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