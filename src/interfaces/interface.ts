import { ChangeEvent, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";

interface Employee{
    id: string,
    cafeId: string,
    cafe_name: string,
    days_worked: number,
    name: string,
    email_address: string,
    phone_number: number
    gender: "Male" | "Female",
    start_date: string,
    createdAt: string,
    updatedAt: string
}


interface Cafe{
    id: string,
    name: string,
    description: string,
    logo?: string,
    location: string,
}

interface Error{
    details: string | any[],
    errors: string | any[]
}

interface AggridTableProps{
    type: string,
    rowData: null | undefined,
    filterData: string[],
    getCafeData?: any
}

interface EmployeeCellRenderer{
    value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
}

interface DefaultColDef{
    flex: number,
    editable: boolean,
    cellDataType: boolean
}

interface ApiSuccess{ 
    status: number; 
    json: () => any; 
}
interface ApiError{ 
    details: string | any[];
    errors: string | any[];
}

interface inputValidation{
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setIsError: (arg0: any) => void,
    isError: any
}

interface inputValidationError{
    name?: string,
    description?: string,
    location?: string
}

export type { Employee, Cafe, Error, AggridTableProps, EmployeeCellRenderer, DefaultColDef, ApiSuccess, ApiError, inputValidation, inputValidationError }
