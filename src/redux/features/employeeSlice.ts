import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Employee{
    id: string,
    cafeId: string,
    name: string,
    email_address: string,
    phone_number: number
    gender: "Male" | "Female",
    start_date: string
}

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