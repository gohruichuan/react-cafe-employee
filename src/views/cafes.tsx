import { useEffect, useCallback, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"

import AggridTable from "../components/table/aggridTable"

import cafeApis from "../apis/cafes"
import { setCafes } from "../redux/features/cafeSlice"

export default function Cafes(){
    const dispatch = useAppDispatch();
    const cafesStoreData = useAppSelector( state => state.cafes)


    const [rowData, setRowData]: any = useState([]);

    const getCafeData = async () =>{
        const cafesData = await cafeApis.getCafes()
        dispatch(setCafes(cafesData))
    }
    useEffect(()=>{
        getCafeData()
    }, [])

    useEffect(()=>{
      if(cafesStoreData.cafes.length){
        const cafesData = JSON.parse(JSON.stringify(cafesStoreData.cafes))
        setRowData(cafesData)
      }
    }, [cafesStoreData.cafes.length])

    return (
        <>
          <h1>List of Cafes</h1>
            <AggridTable
              type="cafes"
              rowData={rowData}
            />
        </>
    )
}