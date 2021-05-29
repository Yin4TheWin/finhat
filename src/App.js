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
import React from "react";
import LoadingScreen from './components/LoadingScreen'

const rooms=["nnmg-studios","super-eee","twinhat"]
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
  React.useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        setSignedIn(true)
        // ...
      } else {
        setSignedIn(false)
      }
    });
  })
  console.log(styles)
  return (
    <Router>
      <Switch>
        <Route path="/chat/:topicID">
          <Chat signedIn={signedIn} exists={exists} setExists={setExists}/>
        </Route>
      </Switch>
    </Router>
  );
}

function formatName(name){
  name=name.replace("-"," ")
  let words = name.split(" ")
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

function Chat(props){
  let {topicID} = useParams()
  const docRef = db.collection("chatrooms").doc(topicID);
  docRef.get().then((doc) => {
    if(doc.exists)
      props.setExists(1)
    else
      props.setExists(2)
    console.log(doc.data())
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  if(props.exists===0)
    return <LoadingScreen/>
  else if(props.exists===1)
    return <ChatScreen name={formatName(topicID)} signedIn={props.signedIn}/>
  return <NotFound/>
}