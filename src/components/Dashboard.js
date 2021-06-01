import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";
import Navbar from './Navbar';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button";
import CreateIcon from '@material-ui/icons/Create';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function Dashboard(props) {
    const [chatName, setName]=React.useState("")
    const [rows, setRows]=React.useState([])  
    const [open, setOpen]=React.useState(false)  
    const db = firebase.firestore()
    React.useEffect(()=>{
        if(props.signedIn){
            const docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
            docRef.onSnapshot((doc) => {
                console.log("Set messages.")
                setRows(doc.data().rooms)
            }); 
        }
    },[db, props.signedIn])
    const formatChatName=(name)=>{
        return name.replaceAll(" ","-").toLowerCase()
    }
  return (
    <React.Fragment>
        <Navbar/>
        <div style={{padding:'5vh'}}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Create a Chatroom
        </Typography>
        <TextField
            id="outlined-basic"
            label="Chat Name"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setName(event.target.value);
            }}
        />
        <Button variant="contained" color="primary" size="large" onClick={()=>{
            if(firebase.auth().currentUser&&chatName.length>0){
                db.collection("chatrooms").doc(formatChatName(chatName)).get().then(doc=>{
                    if(!doc.exists){
                        if(chatName.length>0&&/^[a-z\d\-_\s]+$/i.test(chatName)){
                            db.collection("chatrooms").doc(formatChatName(chatName)).set({
                                messages: [],
                                moderators: [firebase.auth().currentUser.uid],
                                name: chatName
                            }).then(()=>{
                                setOpen(true)
                            });
                            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                                rooms: firebase.firestore.FieldValue.arrayUnion({name: formatChatName(chatName), 
                                    link: formatChatName(chatName)})
                            }).then(()=>{
                                console.log("Finished upload.")
                            });
                        } else{
                            alert("Room name must be at least 1 character and only contain letters, numbers and spaces.")
                        }
                    } else{
                        alert("Sorry, this room already exists.")
                    }
                })
            }
            else{
                alert("You are not signed in, or the room name field is empty! If you are actually signed in and the room name field is not empty, please wait a few seconds and try again.")
            }
        }}
            startIcon={<CreateIcon/>} style={{marginTop:'3vh', marginBottom:'3vh'}}>
            Create!
        </Button>
        <br/>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Created Chatrooms
        </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Link</TableCell>
            <TableCell align="right">Settings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length>0?rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell><a href={window.location.origin+"/chat/"+row.link}>{window.location.origin}/chat/{row.link}</a></TableCell>
              <TableCell align="right">Coming Soon</TableCell>
            </TableRow>
          )):
          <div>
              <br/>
              <Typography>
               You have not created any chatrooms!
              </Typography>
        </div>}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Creation Success! 🥳</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your room was successfully created at <a href={window.location.origin+"/chat/"+formatChatName(chatName)}>{window.location.origin}/chat/{formatChatName(chatName)}</a>
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    </React.Fragment>
  );
}