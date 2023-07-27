import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import cafeApis from "../apis/cafes"
import { setCafes } from "../redux/features/cafeSlice"

interface Cafe {
    "id": string,
    "name": string,
    "description": string,
    "logo": string,
    "location": string,
    "createdAt": string,
    "updatedAt": string
}
export default function Cafes(){
    const dispatch = useAppDispatch();
    const cafesStoreData = useAppSelector( state => state.cafes)

    const getCafeData = async () =>{
        const cafesData = await cafeApis.getCafes()
        dispatch(setCafes(cafesData))
    }
    useEffect(()=>{
        getCafeData()
    }, [])

    return (
        <>
            <div>
                {
                    cafesStoreData.cafes.map((cafe: Cafe) =>{
                        return <p> {cafe.name} </p>
                    })
                }

            </div>
        </>
    )
}