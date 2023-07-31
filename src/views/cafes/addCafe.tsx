import { forwardRef, useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import cafeApis from "../../apis/cafes"

export default function AddCafe(){

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const successMsg = "Successfully Add Cafe"

    const fields = ["name", "description","location"];

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setOpenError(false);
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
            setOpen(true);
            clearInputs();
        }).catch(err => {
            setErrorMsg(err)
            setOpenError(true);
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
                    <button type="submit">Submit form</button>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {successMsg}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </Box>

        </>
    );
}