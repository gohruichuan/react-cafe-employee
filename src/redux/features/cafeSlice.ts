import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cafe } from "../../interfaces/interface";

const initialState: any = {
    cafes: {}
}

const CafeSlice = createSlice({
    name: "cafe",
    initialState,
    reducers:{
        setCafes: (state, action: PayloadAction | any) => {
            state.cafes = action.payload.reduce((accumulator: any, value: Cafe) => {
                accumulator[value.id] = value
                return accumulator;
              }, {});
        },
        editCafe: (state, action: PayloadAction | any) => {
            if(state.cafes[action.payload.id]){
                state.cafes[action.payload.id] = action.payload
            }
        },
        deleteCafe: (state, action: PayloadAction<Cafe>) => {
            if(state.cafes[action.payload.id]){
                delete state.cafes[action.payload.id]
            }
        }
    }
})

export default CafeSlice.reducer;
export const { setCafes, editCafe, deleteCafe } = CafeSlice.actions;