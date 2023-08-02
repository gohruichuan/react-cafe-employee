import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setCafes } from "../../redux/features/cafeSlice"
import { setEmployees } from "../../redux/features/employeeSlice"

import SnackbarComp from '../../components/snackbar/snackbar';

import {Box, TextField, Button, Radio, RadioGroup, FormControlLabel, Select, SelectChangeEvent, MenuItem, FormLabel, FormControl } from '@mui/material';

import employeesApis from "../../apis/employeesapi"
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
    const employeesStoreData = useAppSelector( state => state.employees)

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType]: any = useState();

    const fields = ["name", "email_address", "phone_number", "gender", "worked in"];
    const [isError, setIsError]: any = useState({});

    const [selectedGender, setSelectedGender]: any = useState({});
    const [selectedCafe, setSelectedCafe]: any = useState("");
    const [selectedCafeId, setSelectedCafeId]: any = useState("");

    const [cafesList, setCafesList]: any = useState([]);

    const [editData, setEditData]: any = useState();

    const formatCafeNameList = (cafesData: Cafe[]) => {
        const cafeNameList = cafesData.map((cafe: Cafe) =>  cafe.name)
        setCafesList(cafeNameList)
    }

    const getCafeData = async () =>{
        const cafesData = await cafeApis.getCafes()
        dispatch(setCafes(cafesData))
        formatCafeNameList(cafesData)
    }

    const getEmployeesData = async (cafeName?: string) =>{
        const employeesData = await employeesApis.getEmployees(cafeName)
        dispatch(setEmployees(employeesData))
      }

    const fillInputValues = () => {
        if(employeesStoreData.employees.length){
            const rowData = employeesStoreData.employees.find((employee: Employee) => employee.id === id )
            setEditData(rowData)
            fields.map((field:string) => {
                if(field === "gender"){
                    setSelectedGender(rowData[field])
                } else if (field === "worked in") {
                    setSelectedCafe(rowData.cafe_name);
                    setSelectedCafeId(rowData.cafeId);
                } else {
                    const ele: any = document.getElementById(field)
                    if(ele && !ele.value) ele.value = rowData[field]
                }
            })
        }
          else {
            getEmployeesData()
        }
    }
    useEffect(()=>{
        if(id){
            fillInputValues()
        }
    }, [employeesStoreData.employees?.length])

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
        } else {
            formatCafeNameList(cafesStoreData.cafes)
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
        if(selectedCafeId){
            formJson = Object.assign(formJson, {cafeId: selectedCafeId})
        }
        if(action === 'Add'){
            await employeesApis.addEmployee(formJson).then( () => {
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
        else {
            const newData = Object.assign(JSON.parse(JSON.stringify(editData)), formJson)
            delete newData.createdAt;
            delete newData.updatedAt;
            delete newData.start_date;
            delete newData.days_worked;
            delete newData.cafe_name;

            await employeesApis.editEmployee(newData).then( () => {
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

    const onChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender((event.target as HTMLInputElement).value);
    };

    const phoneValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const reg = new RegExp("^(9|8).{7,7}$");
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
        setIsError({
            ...isError,
            phone_number: !reg.test(e.target.value)
        })
    };

    const nameValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.value = e.target.value.toString().slice(0,10)

        setIsError({
            ...isError,
            name: (e.target.value.length >= 6 && e.target.value.length <= 10)? false: true
        })
    };

    const emailValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const reg = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
        setIsError({
            ...isError,
            email_address: !reg.test(e.target.value)
        })
    };

    const handleChange = async (event: SelectChangeEvent) => {
        const cafesData = JSON.parse(JSON.stringify(cafesStoreData.cafes))
        const cafe = cafesData.find((cafe: Cafe) => cafe.name === event.target.value)

        setSelectedCafe(cafe.name);
        setSelectedCafeId(cafe.id);
    };

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
                                            onChange={(e) => nameValidation(e)}
                                            error={isError["name"]}
                                            helperText="Minimum 6 character and max 10 characters"
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
                                            value={selectedGender}
                                            onChange={onChangeGender}
                                        >
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </div>
                                )
                            } else if(field === "worked in") {
                                return (
                                    <div key={index}>
                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                            <span>Cafe Name: </span>
                                            <Select
                                                value={selectedCafe}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                defaultValue = ""
                                            >
                                                {
                                                    cafesList.length && cafesList.map((data: string, index: number) => {
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