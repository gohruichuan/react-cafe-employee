import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setCafes } from "../../redux/features/cafeSlice"

import SnackbarComp from '../../components/snackbar/snackbar';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import cafeApis from "../../apis/cafesapi"

interface Employee{
    id: string,
    cafeId: string,
    name: string,
    email_address: string,
    phone_number: number
    gender: "Male" | "Female",
    start_date: string
}

export default function AddEmployee(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { id } = useParams()
    const [action, setAction] = useState("Add");

    const cafesStoreData = useAppSelector( state => state.cafes)

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType]: any = useState();

    const fields = ["name", "description", "location"];

    const [editData, setEditData]: any = useState();

    const getCafeData = async (location?: string) =>{
        const cafesData = await cafeApis.getCafes(location)
        dispatch(setCafes(cafesData))
    }

    const fillInputValues = () => {
        if(cafesStoreData.cafes.length){
            const rowData = cafesStoreData.cafes.find((cafe: Employee) => cafe.id === id )
            setEditData(rowData)
            fields.map((field:string) => {
                const ele: any = document.getElementById(field)
                if(ele && !ele.value) ele.value = rowData[field]
            })
        }
          else {
            getCafeData()
        }
    }
    useEffect(()=>{
        fillInputValues()
    }, [cafesStoreData.cafes.length])

    useEffect(() => {
        if(id){
            setAction("Edit")
            fillInputValues()
        }
    }, [])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const clearInputs = () => {
        fields.map((field:string) => {
            const ele: any = document.getElementById(field)
            if(ele && ele.value) ele.value = ""
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());

        if(action === 'Add'){
            await cafeApis.addCafe(formJson).then( () => {
                setMsg("Successfully added cafe")
                setType("success")
                setOpen(true);
                clearInputs();
            }).catch(err => {
                setMsg("Failed to add cafe: "+ err)
                setType("error")
                setOpen(true);
            })
        } else {
            const newData = Object.assign(JSON.parse(JSON.stringify(editData)), formJson)

            delete newData.createdAt;
            delete newData.updatedAt;
            delete newData.employees;

            await cafeApis.editCafe(newData).then( () => {
                setMsg("Successfully edited cafe")
                setType("success")
                setOpen(true);
            }).catch(err => {
                setMsg("Failed to edit cafe: "+ err)
                setType("error")
                setOpen(true);
            })
        }


    }

    return (
        <>
            <h1>{action} Employee</h1>
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '55ch' },
                }}
            >   
                <form method="post" onSubmit={handleSubmit}>
                    {
                        fields.map( (field: string, index: number) => {

                            const firstLetter = field.charAt(0);
                            const firstLetterCap = firstLetter.toUpperCase();

                            const remainingLetters = field.slice(1);

                            const capitalizedWord = firstLetterCap + remainingLetters;

                            if(field !== "description"){
                                return (
                                    <div key={index}>
                                        <TextField
                                            required
                                            label={capitalizedWord}
                                            name={field}
                                            id={field}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index}>
                                        <TextField
                                            required
                                            multiline
                                            rows={5}
                                            label={capitalizedWord}
                                            name={field}
                                            id={field}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                    <Button type="submit" variant='contained'>Submit form</Button>
                    <Button variant='contained' style={{marginLeft: "20px"}} onClick={()=> navigate("/employees")}>Cancel</Button>
                </form>
                <SnackbarComp
                    type={type}
                    msg={msg}
                    open={open}
                    handleClose={handleClose}
                />
            </Box>

        </>
    );
}