import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Popup(props){
    return( <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.diagTitle}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.diagText}
            </DialogContentText>
            <br></br>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Username" variant="outlined" />
            </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>)
}