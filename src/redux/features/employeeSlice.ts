import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../interfaces/interface";

const initialState: any = {
    employees: {}
}

const EmployeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers:{
        setEmployees: (state, action: PayloadAction | any) => {
            state.employees = action.payload.reduce((accumulator: any, value: Employee) => {
                accumulator[value.id] = value
                return accumulator;
              }, {});
        },
        editEmployee: (state, action: PayloadAction | any) => {
            if(state.employees[action.payload.id]){
                state.employees[action.payload.id] = action.payload
            }
        },
        deleteEmployee: (state, action: PayloadAction<Employee>) => {
            if(state.employees[action.payload.id]){
                delete state.employees[action.payload.id]
            }
        }
    }
})

export default EmployeeSlice.reducer;
export const { setEmployees, editEmployee, deleteEmployee } = EmployeeSlice.actions;