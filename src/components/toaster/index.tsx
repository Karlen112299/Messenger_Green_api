import React, { useEffect, useState } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

export function Toaster ({isOpen,error}:{isOpen: boolean,error:any}) {
    const [open, setOpen] = useState(false);

    const handleClose = (
      _event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    useEffect(()=>{
        setOpen(isOpen)
    },[isOpen])
  
    return (
      <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {error?.data?.invokeStatus?.description ?? 'error'}
            </Alert>
        </Snackbar>
      </div>
    );
}