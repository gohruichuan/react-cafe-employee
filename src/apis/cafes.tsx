const getCafes = async() => {
    return await fetch("http://127.0.0.1:8080/cafes?location=",{ method:"GET" }).then(res =>{
        console.log("res ", res)

        return res
    })
}

const functions = {
    "getCafes": getCafes
}
export default functions;