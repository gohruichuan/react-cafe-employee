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
        return await res.json()
    } catch(err){
        throw err;
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

            console.warn("res.status  ", res.status );

            if(res.status === 200)
                return await res.json()
            else throw await res.json()
    } catch(err: any){
        console.warn("err ", err);
        if(err.details.length){
            throw err.details[0].message;
        }
    }
}

const apiFuncs = {
    getEmployees: getEmployees,
    addEmployee: addEmployee
}

export default apiFuncs;