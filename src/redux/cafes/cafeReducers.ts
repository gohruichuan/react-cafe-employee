import cafesApi from "../../apis/cafes"
import actions from "./cafeActions";

interface Cafe {
    "id": string,
    "name": string,
    "description": string,
    "logo": string,
    "location": string,
    "createdAt": string,
    "updatedAt": string
}

interface State {
    cafes: Cafe[]
}

interface CafeReducer {
    state: State,
    actions: {
        type: string
    }
}

const initialState: State = {
    cafes: [],
}

const cafesReducer =  (state = initialState, actions: any) =>{
    switch(actions.type){
        case "GET_CAFES": {
            fetch("http://127.0.0.1:8080/cafes?location=",{ method:"GET" }).then( async res =>{
                state.cafes = await res.json()
                console.log("state.cafes ", state.cafes)
            })

            return { ...state};
        }

        default: return state;
    }
}

export default cafesReducer;