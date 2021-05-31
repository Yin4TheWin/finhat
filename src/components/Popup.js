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
    const [formState, setFormState]=React.useState(props.formState)
    const [email, setEmail]=React.useState("")
    const [password, setPassword]=React.useState("")
    const db = firebase.firestore()
    return( <Dialog
        open={props.open}
        onClose={props.handleClose}
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
                    <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth onChange={(event)=>{
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
                     <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth onChange={(event)=>{
                            setEmail(event.target.value)
                        }}
                    />
                    <br/><br/>
                    <TextField id="standard-password-input" label="Password" variant="outlined" type="password"
                        fullWidth 
                        autoComplete="current-password"
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                firebase.auth().signInWithEmailAndPassword(email, password)
                                .then((userCredential) => {
                                    db.collection("users").doc(userCredential.user.uid).get().then((doc) => {
                                        if (doc.exists&&props.setUser&&props.setUID) {
                                            props.setUser(doc.data().username)
                                            props.setUID(userCredential.user.uid)
                                        } else if(props.setUser) {
                                            props.setUser("No Username")
                                        }
                                        props.handleClose()
                                    }).catch((error) => {
                                        console.log("Error getting document:", error);
                                    });
                                })
                                .catch((error) => {
                                    alert(error)
                                });
                            }
                        }}
                    />
                    <br></br>
                    {!props.hide?<Button onClick={()=>{setFormState(0)}} color="primary">
                        Be Anonymous Instead
                    </Button>:<div></div>}
                 </div>
            }
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                formState===0?props.handleClose():
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    db.collection("users").doc(userCredential.user.uid).get().then((doc) => {
                        if (doc.exists&&props.setUser&&props.setUID) {
                            props.setUser(doc.data().username)
                            props.setUID(userCredential.user.uid)
                        } else if (props.setUser){
                            props.setUser("No Username")
                        }
                        props.handleClose()
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
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