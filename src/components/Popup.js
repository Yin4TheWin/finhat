import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase/app";
import "firebase/auth";

export default function Popup(props) {
  const [formState, setFormState] = React.useState(props.formState);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("")
  const db = firebase.firestore();
  if (formState !== 2)
    return (
      <Dialog
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
          {formState === 0 ? (
            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  props.setUser(event.target.value);
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    props.handleClose();
                  }
                }}
              />
              <br></br>
              <Button
                onClick={() => {
                  setFormState(1);
                }}
                color="primary"
              >
                Sign In Instead
              </Button>
            </div>
          ) : (
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                id="standard-password-input"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(email, password)
                      .then((userCredential) => {
                        db.collection("users")
                          .doc(userCredential.user.uid)
                          .get()
                          .then((doc) => {
                            if (doc.exists) {
                              if (props.setUser && props.setUID) {
                                props.setUser(doc.data().username);
                                props.setUID(userCredential.user.uid);
                              }
                              if (props.onLogin) props.onLogin();
                            } else if (props.setUser) {
                              props.setUser("No Username");
                            }
                            props.handleClose();
                          })
                          .catch((error) => {
                            console.log("Error getting document:", error);
                          });
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  }
                }}
              />
              <br></br>
              {!props.hide ? (
                <Button
                  onClick={() => {
                    setFormState(0);
                  }}
                  color="primary"
                >
                  Be Anonymous Instead
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setFormState(2);
                  }}
                  color="primary"
                >
                  Register
                </Button>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              formState === 0
                ? props.handleClose()
                : firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                      db.collection("users")
                        .doc(userCredential.user.uid)
                        .get()
                        .then((doc) => {
                          if (doc.exists) {
                            if (props.setUser && props.setUID) {
                              props.setUser(doc.data().username);
                              props.setUID(userCredential.user.uid);
                            }
                            if (props.onLogin) props.onLogin();
                          } else if (props.setUser) {
                            props.setUser("No Username");
                          }
                          props.handleClose();
                        })
                        .catch((error) => {
                          console.log("Error getting document:", error);
                        });
                    })
                    .catch((error) => {
                      alert(error);
                    });
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Welcome Aboard! 🎉</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          To register for an account, enter your desired username, password and email address (all required).
        </DialogContentText>
        <br></br>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            autoComplete='off'
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="standard-password-input"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete='off'
            fullWidth
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                if(username.length>0&&/^[a-z\d\-_\s]+$/i.test(username)&&!username.toLowerCase().replaceAll("0","o").replaceAll("3","e").replaceAll(" ","").includes('moderator'))
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                    db.collection("users")
                      .doc(userCredential.user.uid)
                      .set({
                          username: username,
                          rooms: []
                      }).then(()=>{
                          props.onLogin()
                      }).catch((error) => {
                        alert(error);
                      });
                  })
                  else
                    alert("Username must be at least 1 character, can only contain alphanumeric characters and spaces, and must not contain the word moderator!")
                }
            }}
          />
          <br/><br/>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            autoComplete='off'
            fullWidth
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <br />
          <br />
            <Button
              onClick={() => {
                setFormState(1);
              }}
              color="primary"
            >
              Login
            </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if(username.length>0&&/^[a-z\d\-_\s]+$/i.test(username)&&!username.toLowerCase().replaceAll("0","o").replaceAll("3","e").replaceAll(" ","").includes('moderator'))
            {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                    db.collection("users")
                      .doc(userCredential.user.uid)
                      .set({
                          username: username,
                          rooms: []
                      }).then(()=>{
                          props.onLogin()
                      })
                  })
                  .catch((error) => {
                    alert(error);
                  });
            }
            else{
                alert("Username must be at least 1 character, can only contain alphanumeric characters and spaces, and must not contain the word moderator!")
            }
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
