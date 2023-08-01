import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"

import AggridTable from "../../components/table/aggridTable"
import employeesApis from "../../apis/employeesapi"

import { setEmployees } from "../../redux/features/employeeSlice"

export default function Employees(){
    const dispatch = useAppDispatch();
    const employeesStoreData = useAppSelector( state => state.employees)

    const [rowData, setRowData]: any = useState([]);
    const [filterData, setFilterData]: any = useState([]);

    const getEmployeesData = async (cafeName?: string) =>{


        const employeesData = await employeesApis.getEmployees(cafeName)
        dispatch(setEmployees(employeesData))
    }
    useEffect(()=>{
        getEmployeesData()
    }, [])

    useEffect(()=>{
      if(employeesStoreData.employees.length){
        const cafesData = JSON.parse(JSON.stringify(employeesStoreData.employees))
        setRowData(cafesData)
      }
    }, [employeesStoreData.employees.length])

    return (
        <>
          <h1>List of Cafes</h1>
            <AggridTable
              type="employees"
              rowData={rowData}
              filterData={filterData}
            />
        </>
    )
}