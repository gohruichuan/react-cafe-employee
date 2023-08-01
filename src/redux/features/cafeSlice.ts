import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Cafe{
    id: string,
    name: string,
    description: string,
    logo?: string,
    location: string,
}
const initialState: any = {
    cafes: []
}

const CafeSlice = createSlice({
    name: "cafe",
    initialState,
    reducers:{
        setCafes: (state, action: PayloadAction) => {
            state.cafes = action.payload;
        },
        deleteCafe: (state, action: PayloadAction<Cafe>) => {
            state.cafes = state.cafes.filter((cafe: Cafe) => {
                return cafe.id !== action.payload.id;
            });
        }
    }
})

export default CafeSlice.reducer;
export const { setCafes, deleteCafe } = CafeSlice.actions;