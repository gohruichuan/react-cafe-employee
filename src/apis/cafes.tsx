const url = "http://127.0.0.1:8080/cafes"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const getCafes = ( params = "" ) => {
    return fetch(`${url}?location=`+params,{ method:"GET" }).then( async res =>{
        return await res.json();
    }).catch(err => {throw err})
}

const addCafe = ( params = {} ) => {
    return fetch(`${url}`,{
            method:"POST",
            headers: headers,
            body: JSON.stringify(params)
        }).then( async res =>{
            return await res.json();
        }).catch(err => {throw err})
}

const functions = {
    "getCafes": getCafes,
    "addCafe": addCafe
}
export default functions;