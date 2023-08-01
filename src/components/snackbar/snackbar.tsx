import { forwardRef } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

interface SnackBarInterface{
    type: AlertColor,
    msg: string,
    open: boolean,
    handleClose: any
}
export default function SnackbarComp({type, msg, open, handleClose}: SnackBarInterface){
      const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
          props,
          ref,
      ) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return(
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}