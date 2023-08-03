import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../interfaces/interface";

const initialState: any = {
    employees: []
}

const EmployeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers:{
        setEmployees: (state, action: PayloadAction) => {
            state.employees = action.payload;
        },
        deleteEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees = state.employees.filter((employee: Employee) => {
                return employee.id !== action.payload.id;
            });
        }
    }
})

export default EmployeeSlice.reducer;
export const { setEmployees, deleteEmployee } = EmployeeSlice.actions;