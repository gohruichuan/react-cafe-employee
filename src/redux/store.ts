import { configureStore } from '@reduxjs/toolkit'
import CafeSlice from './features/cafeSlice'
import EmployeeSlice from './features/employeeSlice'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        cafes: CafeSlice,
        employees: EmployeeSlice
    }
})

export const useAppDispatch:()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector