import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase/app";
import "firebase/auth";

export default function Popup(props){
    const [formState, setFormState]=React.useState(0)
    const [email, setEmail]=React.useState("")
    const [password, setPassword]=React.useState("")
    const db = firebase.firestore()
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
            {
                formState===0?<div>
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(event)=>{
                        props.setUser(event.target.value)
                    }}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            props.handleClose()
                        }
                    }}/>
                    <br></br>
                    <Button onClick={()=>{setFormState(1)}} color="primary">
                        Sign In Instead
                    </Button>
                    </div>:<div>
                     <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event)=>{
                            setEmail(event.target.value)
                        }}
                    />
                    <TextField id="standard-password-input" label="Password" variant="outlined" type="password"
                        autoComplete="current-password"
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                firebase.auth().signInWithEmailAndPassword(email, password)
                                .then((userCredential) => {
                                    db.collection("users").doc(userCredential.user.uid).get().then((doc) => {
                                        if (doc.exists) {
                                            props.setUser(doc.data().username)
                                        } else {
                                            props.setUser("No Username")
                                        }
                                    }).catch((error) => {
                                        console.log("Error getting document:", error);
                                    });
                                    props.handleClose()
                                })
                                .catch((error) => {
                                    alert(error)
                                });
                            }
                        }}
                    />
                    <br></br>
                    <Button onClick={()=>{setFormState(0)}} color="primary">
                        Be Anonymous Instead
                    </Button>
                 </div>
            }
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                formState===0?props.handleClose():
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    db.collection("users").doc(userCredential.user.uid).get().then((doc) => {
                        if (doc.exists) {
                            props.setUser(doc.data().username)
                        } else {
                            props.setUser("No Username")
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                    props.handleClose()
                })
                .catch((error) => {
                    alert(error)
                });
            }} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>)
}