import { useEffect } from "react"
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
    const dispatch = useDispatch();
    const cafes = useSelector( (state: State) => state.cafes)
    useEffect(()=>{
        dispatch(cafeActions.getCafes())

        console.log("cafes ", cafes)
    })

    return (
        <>
            <div>Hello world!</div>
        </>
    )
}