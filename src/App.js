import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ChatScreen from './components/ChatScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import NotFound from './components/NotFound'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useEffect } from "react";
import LoadingScreen from './components/LoadingScreen'
import Home from './components/Home'

const firebaseConfig = {
  apiKey: "AIzaSyAcG30CshhgN7Ha8AGrkRsc4yDDgDVgQTM",
  authDomain: "message-8dfa2.firebaseapp.com",
  projectId: "message-8dfa2",
  storageBucket: "message-8dfa2.appspot.com",
  messagingSenderId: "335062761993",
  appId: "1:335062761993:web:0fc9234d0a9082da376ed8",
  measurementId: "G-NTWK2FY6VQ"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
    // ignore app already initialized error in stack
}

const db = firebase.firestore()

export default function App() {
  const [signedIn, setSignedIn]=React.useState(false)
  const [exists, setExists]=React.useState(0)
  const [roomName, setRoomName] = React.useState("")
  const [userID, setUserID] = React.useState("")
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true)
        setUserID(user.uid)
      } else {
        setSignedIn(false)
      }
    });
  }, [])
  console.log(styles)
  return (
    <Router>
      <Switch>
        <Route path="/chat/:topicID">
          <Chat signedIn={signedIn} exists={exists} setExists={setExists} roomName={roomName} setRoomName={setRoomName} userID={userID}/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

function Chat(props){
  let {topicID} = useParams()
  useEffect(()=>{
    const docRef = db.collection("chatrooms").doc(topicID);
    docRef.get().then((doc) => {
      if(doc.exists){
        props.setRoomName(doc.data().name)
        props.setExists(1)
      }
      else
        props.setExists(2)
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },[props, topicID])
  if(props.exists===0)
    return <LoadingScreen/>
  else if(props.exists===1)
    return <ChatScreen name={props.roomName} signedIn={props.signedIn} topicID={topicID} userID={props.userID}/>
  return <NotFound/>
}