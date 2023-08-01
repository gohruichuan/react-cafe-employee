import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import SnackbarComp from '../../components/snackbar/snackbar';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import cafeApis from "../../apis/cafesapi"

export default function AddCafe(){

    const { id } = useParams()

    const [action, setAction] = useState("Add");

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType]: any = useState();

    const fields = ["name", "description","location"];

    useEffect(() => {
        console.log("received id ", id)
        if(id) setAction("Edit")
        
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
        await cafeApis.addCafe(formJson).then( () => {
            setMsg("Successfully add cafe")
            setType("success")
            setOpen(true);
            clearInputs();
        }).catch(err => {
            setMsg("Failed to add cafe: "+ err)
            setType("error")
            setOpen(true);
        })

    }

    return (
        <>
            <h1>{action} Cafe</h1>
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