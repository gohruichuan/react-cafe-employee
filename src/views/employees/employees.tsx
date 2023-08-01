import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"

import AggridTable from "../../components/table/aggridTable"
import employeesApis from "../../apis/employeesapi"
import cafeApis from "../../apis/cafesapi"

import { setCafes } from "../../redux/features/cafeSlice"
import { setEmployees } from "../../redux/features/employeeSlice"

export default function Employees(){
    const dispatch = useAppDispatch();
    const employeesStoreData = useAppSelector( state => state.employees)
    const cafeStoreData = useAppSelector( state => state.cafes)

    const [rowData, setRowData]: any = useState([]);
    const [filterData, setFilterData]: any = useState([]);

    const getEmployeesData = async (cafeName?: string) =>{
        const employeesData = await employeesApis.getEmployees(cafeName)
        dispatch(setEmployees(employeesData))
    }

    // const getCafeData = async () =>{
    //   if(!cafeStoreData.cafes.length){
    //     const cafesDataRes = await cafeApis.getCafes()
    //     dispatch(setCafes(cafesDataRes))
    //   }
    // }

    useEffect(()=>{
        getEmployeesData()
        // getCafeData()
    }, [])

    useEffect(()=>{
      if(employeesStoreData.employees.length){
        const employeesData = JSON.parse(JSON.stringify(employeesStoreData.employees))
        setRowData(employeesData)
      }
    }, [employeesStoreData.employees.length])

    return (
        <>
          <h1>List of Employees</h1>
            {
              rowData.length && (
                <AggridTable
                  type="employees"
                  rowData={rowData}
                  filterData={filterData}
                />
              )
            }
        </>
    )
}