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

const cafesReducer = async (state = initialState, actions: any): Promise<State> =>{
    switch(actions.type){
        case "GET_CAFES": {
            const cafes = await cafesApi.getCafes();
            console.log("cafes ", cafes)

            return { ...state};
        }

        default: return state;
    }
}

export default cafesReducer;