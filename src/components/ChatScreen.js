import {
    MainContainer,
    ChatContainer,
    MessageList,
    ConversationHeader,
    MessageInput,
  } from "@chatscope/chat-ui-kit-react";
import testAvatar from '../logo.svg'
import ChatMessage from './ChatMessage'
import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Popup from './Popup'
import uniqid from 'uniqid'

let unsubscribe

function ChatScreen(props){
    const [messages, setMessages] = React.useState([])
    const [newMessage, setNewMessage]=React.useState("")
    const [open, setOpen] = React.useState(!props.userID.length>0);
    const [username, setUsername] = React.useState("")
    const [uid, setUID] = React.useState(firebase.auth().currentUser?firebase.auth().currentUser.uid:uniqid())
    const [mods, setMods] = React.useState([])
    const db = firebase.firestore()
    const handleClose = (event, reason) => {
        console.log(event)
        if (reason !== 'backdropClick') {
            if(firebase.auth().currentUser||(username.length>0&&/^[a-z\d\-_\s]+$/i.test(username)&&!username.toLowerCase().replaceAll("0","o").replaceAll("3","e").replaceAll(" ","").includes('moderator')))
                setOpen(false);
            else
                alert("Name can only contain alphanumeric characters, spaces and dashes, and cannot contain the word \"moderator\"!")
        }
    };
    useEffect(()=>{
        if(props.signedIn){
            db.collection("users").doc(firebase.auth().currentUser.uid).get().then((doc) => {
                if (doc.exists) {
                    setUsername(doc.data().username)
                    setUID(firebase.auth().currentUser.uid)
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    },[db, uid, props.signedIn])
    useEffect(()=>{
        if(unsubscribe)
            unsubscribe()
        const docRef = db.collection("chatrooms").doc(props.topicID);
        unsubscribe=docRef.onSnapshot((doc) => {
            console.log("Set messages.")
            setMessages(doc.data().messages.map((element)=>{
            return(<ChatMessage date={element.date} 
                message={element.message} sender={element.sender} avatar={testAvatar} 
                direction={uid===element.uid?"outgoing":"incoming"} mod={element.mod}/>)
            }))
            setMods(doc.data().moderators)
        });
    },[db, uid, props.topicID])

      return (
        <div style={{ position: "relative", height: "100vh" }}>
          <MainContainer>
            <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Content userName={props.name} info="General Support Room" />         
            </ConversationHeader>
              <MessageList>
                {messages}
              </MessageList>
              <MessageInput placeholder="Type message here" onChange={(val)=>{setNewMessage(val)}} onSend={()=>{
                  console.log("Sent")
                   db.collection("chatrooms").doc(props.topicID).update({
                        messages: firebase.firestore.FieldValue.arrayUnion({
                            message: newMessage,
                            sender: username,
                            uid: uid,
                            date: Date.now(),
                            mod: mods.includes(uid)
                        })
                    }).then(()=>{
                        console.log("Finished upload.")
                    });
                }}/>
            </ChatContainer>
          </MainContainer>
          <Popup formState={0} diagTitle="Welcome!" diagText="Enter a username to start chatting anonymously, or sign in if you are a chat admin."
           open={open} handleClose={handleClose} setUser={setUsername}
           setUID={setUID}/>
        </div>
      );
}

export default ChatScreen;