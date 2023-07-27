import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    cafes: []
}

const CafeSlice = createSlice({
    name: "cafe",
    initialState,
    reducers:{
        setCafes: (state, action: PayloadAction) => {
            state.cafes = action.payload;
        }
    }
})

export default CafeSlice.reducer;
export const { setCafes } = CafeSlice.actions;