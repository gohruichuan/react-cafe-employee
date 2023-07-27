const getCafes = () => {
    return fetch("http://127.0.0.1:8080/cafes?location=",{ method:"GET" }).then( async res =>{
        return await res.json();
    })
}

const functions = {
    "getCafes": getCafes
}
export default functions;