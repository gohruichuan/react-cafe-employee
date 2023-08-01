import { forwardRef, useState } from 'react'
import SnackbarComp from '../../components/snackbar/snackbar';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';

import cafeApis from "../../apis/cafes"

export default function AddCafe(){

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType]: any = useState();

    const fields = ["name", "description","location"];

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


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
            setMsg("Successfully Add Cafe")
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
            <h1>Add Cafe</h1>
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '55ch' },
                }}
            >   
                <form method="post" onSubmit={handleSubmit}>
                    {
                        fields.map( (field: string) => {

                            const firstLetter = field.charAt(0);
                            const firstLetterCap = firstLetter.toUpperCase();

                            const remainingLetters = field.slice(1);

                            const capitalizedWord = firstLetterCap + remainingLetters;

                            if(field !== "description"){
                                return (
                                    <div>
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
                                    <div>
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