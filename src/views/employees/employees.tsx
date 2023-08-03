import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"

import AggridTable from "../../components/table/aggridTable"
import employeesApis from "../../apis/employeesapi"

import { setEmployees } from "../../redux/features/employeeSlice"
import { useParams } from "react-router-dom"

export default function Employees(){
    const dispatch = useAppDispatch();
    const { cafeid } = useParams()

    const employeesStoreData = useAppSelector( state => state.employees)

    const [rowData, setRowData]: any = useState([]);
    const [filterData, setFilterData]: any = useState([]);

    const getEmployeesData = async (cafeName?: string) =>{
      const employeesData = await employeesApis.getEmployees(cafeName)
      dispatch(setEmployees(employeesData))
    }

    useEffect(()=>{
        getEmployeesData(cafeid)
    }, [])

    useEffect(()=>{
      if(employeesStoreData.employees?.length){
        const employeesData = JSON.parse(JSON.stringify(employeesStoreData.employees))
        setRowData(employeesData)
      }
    }, [employeesStoreData.employees?.length])

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