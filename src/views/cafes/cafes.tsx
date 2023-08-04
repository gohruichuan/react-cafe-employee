import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"

import AggridTable from "../../components/table/aggridTable"
import cafeApis from "../../apis/cafesapi"

import { setCafes } from "../../redux/features/cafeSlice"
import { Cafe } from "../../interfaces/interface"

export default function Cafes(){
    const dispatch = useAppDispatch();
    const cafesStoreData = useAppSelector( state => state.cafes)

    const [rowData, setRowData]: Array<Cafe> | any = useState([]);
    const [filterData, setFilterData]: Array<string> | any = useState([]);

    const getCafeData = async (location?: string) =>{
        const cafesData = await cafeApis.getCafes(location)
        dispatch(setCafes(cafesData))

        if(!filterData.length){
          const locationsData = cafesData.reduce((accumulator: any[], cafe: { location: string }) => {
            if (accumulator.indexOf(cafe.location) === -1) {
              accumulator.push(cafe.location);
            }
            return accumulator;
          }, []);
          setFilterData(locationsData)
        }
    }
    useEffect(()=>{
        getCafeData()
    }, [])

    useEffect(()=>{
        const cafesData = JSON.parse(JSON.stringify(cafesStoreData.cafes))
        setRowData(Object.values(cafesData))
    }, [Object.keys(cafesStoreData.cafes).length || cafesStoreData.cafes])

    return (
        <>
          <h1>List of Cafes</h1>
            <AggridTable
              type="cafes"
              rowData={rowData}
              filterData={filterData}
              getCafeData={getCafeData}
            />
        </>
    )
}