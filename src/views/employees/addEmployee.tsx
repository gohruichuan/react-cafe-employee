import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setCafes } from "../../redux/features/cafeSlice"

import SnackbarComp from '../../components/snackbar/snackbar';

import {Box, TextField, Button, Radio, RadioGroup, FormControlLabel, Select, SelectChangeEvent, MenuItem, FormLabel, FormControl } from '@mui/material';

import employeesApi from "../../apis/employeesapi"
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

interface Cafe{
    id: string,
    name: string,
    description: string,
    logo?: string,
    location: string,
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

    const fields = ["name", "email_address", "phone_number", "gender", "Worked in"];
    const [isError, setIsError]: any = useState({});
    const [selectedCafe, setSelectedCafe]: any = useState({});
    const [cafesList, setCafesList]: any = useState([]);

    const [editData, setEditData]: any = useState();

    const getCafeData = async () =>{
        const cafesData = await cafeApis.getCafes()
        dispatch(setCafes(cafesData))
        
        const cafeNameList = cafesData.map((cafe: Cafe) =>  cafe.name)
        setCafesList(cafeNameList)
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
            // getCafeData()
        }
    }
    // useEffect(()=>{
    //     if(id){
    //         fillInputValues()
    //     }
    // }, [cafesStoreData.cafes.length])

    useEffect(() => {
        const isErrorObj:any = {}
        if(id){
            setAction("Edit")
            fillInputValues()
        }

        fields.map( field => isErrorObj[field] = false)
        setIsError(isErrorObj)

        if(!cafesStoreData.cafes.length){
            getCafeData()
        }
        console.log("cafesStoreData.cafes ", cafesStoreData.cafes)

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
        console.warn("formJson ", formJson);
        if(selectedCafe?.cafeId){
            formJson = Object.assign(formJson, {cafeId: selectedCafe.cafeId})
        }
        if(action === 'Add'){
            await employeesApi.addEmployee(formJson).then( () => {
                setMsg("Successfully added employee")
                setType("success")
                setOpen(true);
                clearInputs();
            }).catch(err => {
                setMsg("Failed to add employee: "+ err)
                setType("error")
                setOpen(true);
            })
        }
        // else {
        //     const newData = Object.assign(JSON.parse(JSON.stringify(editData)), formJson)

        //     delete newData.createdAt;
        //     delete newData.updatedAt;
        //     delete newData.employees;

        //     await employeesApi.editCafe(newData).then( () => {
        //         setMsg("Successfully edited cafe")
        //         setType("success")
        //         setOpen(true);
        //     }).catch(err => {
        //         setMsg("Failed to edit cafe: "+ err)
        //         setType("error")
        //         setOpen(true);
        //     })
        // }
    }

    const phoneValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const reg = new RegExp("^(9|8).{7,7}$");
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
        setIsError({
            ...isError,
            phone_number: !reg.test(e.target.value)
        })
    };

    const emailValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const reg = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
        setIsError({
            ...isError,
            email_address: !reg.test(e.target.value)
        })
    };

    const handleChange = async (event: SelectChangeEvent) => {
        const cafesData = JSON.parse(JSON.stringify(cafesStoreData.cafes))
        const cafe = cafesData.find((cafe: Cafe) => cafe.name = event.target.value)
        setSelectedCafe({cafeId: cafe.id, cafeName: cafe.name});
    };

    const cafeListDOM = (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={selectedCafe}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {
                        cafesList.map((data: string, index: number) => {
                            return (<MenuItem key={index} value={data}>{data}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        </>
      )

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

                            const capitalizedWord = (firstLetterCap + remainingLetters).replace("_"," ");
                            
                            if(field === "name"){
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
                            } else if(field === "email_address") {
                                return (
                                    <div key={index}>
                                        <TextField
                                            required
                                            type="email"
                                            label={capitalizedWord}
                                            name={field}
                                            id={field}
                                            onChange={(e) => emailValidation(e)}
                                            error={isError["email_address"]}
                                        />
                                    </div>
                                )
                            } else if(field === "phone_number") {
                                return (
                                    <div key={index}>
                                        <TextField
                                            required
                                            type="number"
                                            label={capitalizedWord}
                                            name={field}
                                            id={field}
                                            onChange={(e) => phoneValidation(e)}
                                            error={isError["phone_number"]}
                                            helperText="Phone Number Starts with 8 or 9, and have 8 digits"
                                        />
                                    </div>
                                )
                            } else if(field === "gender") {
                                return (
                                    <div key={index}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        >
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </div>
                                )
                            } else if(field === "Worked in") {
                                return (
                                    <div key={index}>
                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                            <span>Cafe Name: </span>
                                            <Select
                                                value={selectedCafe.cafeName}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                defaultValue = ""
                                            >
                                                {
                                                    cafesList.map((data: string, index: number) => {
                                                        return (<MenuItem key={index} value={data}>{data}</MenuItem>)
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
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