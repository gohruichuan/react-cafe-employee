const url = "http://127.0.0.1:8080/cafes"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const getCafes = async ( params = "" ) => {
    try {
        const res = await fetch(`${url}?location=` + params, { method: "GET" });
        return await res.json();
    } catch (err) {
        throw err;
    }
}

const addCafe = async ( params = {} ) => {
    try {
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params)
        });
        return await await res.json();
    } catch (err) {
        throw err;
    }
}

const editCafe = async ( params = {} ) => {
    try {
        const res = await fetch(`${url}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(params)
        });
        return await await res.json();
    } catch (err) {
        throw err;
    }
}

const deleteCafe = async ( params = {}) => {
    try {
        const res = await fetch(`${url}`, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify({ id: params })
        });
        return await await res.json();
    } catch (err) {
        throw err;
    }
}

const functions = {
    "getCafes": getCafes,
    "addCafe": addCafe,
    "editCafe": editCafe,
    "deleteCafe": deleteCafe
}
export default functions;