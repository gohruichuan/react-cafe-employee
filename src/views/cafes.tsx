import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import cafeActions from "../redux/cafes/cafeActions"

interface Cafe {
    "id": string,
    "name": string,
    "description": string,
    "logo": string,
    "location": string,
    "createdAt": string,
    "updatedAt": string
}

interface State {
    cafes: Cafe[]
}

export default function Cafes(){
    console.log("ENTERED COMP")
    const [cafesData, setCafesData]: any[] = useState([])

    const dispatch = useDispatch();
    const cafesStoreData = useSelector( (state: State) => state.cafes)
    useEffect(()=>{
        console.log("dispatch");
        
        dispatch(cafeActions.getCafes())
    }, [])

    // useEffect(()=>{

    //     console.log("state change");
        
    //     setCafesData(cafesStoreData)
    //     console.log("cafesData ", cafesData);
    // }, [cafesStoreData])

    return (
        <>
            <div>
                {
                    cafesData.map((cafe: Cafe) =>{
                        return <p> {cafe.name} </p>
                    })
                }

            </div>
        </>
    )
}