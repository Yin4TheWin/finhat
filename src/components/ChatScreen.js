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

function ChatScreen(props){
    const [messages, setMessages] = React.useState([])
    const [newMessage, setNewMessage]=React.useState("")
    const [open, setOpen] = React.useState(!props.userID.length>0);
    const [username, setUsername] = React.useState("")
    const [uid, setUID] = React.useState(uniqid())
    const db = firebase.firestore()
    const handleClose = () => {
    if(firebase.auth().currentUser||(username.length>0&&/^[a-z\d\-_\s]+$/i.test(username)&&!username.toLowerCase().replaceAll("0","o").replaceAll("3","e").replaceAll(" ","").includes('moderator')))
        setOpen(false);
    else
        alert("Name can only contain alphanumeric characters, spaces and dashes, and cannot contain the word \"moderator\"!")
    };
    useEffect(()=>{
        if(props.signedIn&&props.userID){
            setUID(props.userID)
            console.log(props.userID)
            db.collection("users").doc(props.userID).get().then((doc) => {
                if (doc.exists) {
                    setUsername(doc.data().username)
                } else {
                    setUsername("No Username")
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
        const docRef = db.collection("chatrooms").doc(props.topicID);
        docRef.onSnapshot((doc) => {
            console.log("Set messages.")
            setMessages(doc.data().messages.map((element)=>{
            return(<ChatMessage date={element.date} 
                message={element.message} sender={element.sender} avatar={testAvatar} 
                direction={uid===element.uid?"outgoing":"incoming"} mod={element.mod}/>)
            }))
        });
    }, [db, props.topicID, uid, props.userID, setUID, props.signedIn])
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
                            mod: false,
                            date: Date.now()
                        })
                    }).then(()=>{
                        console.log("Finished upload.")
                    });
                }}/>
            </ChatContainer>
          </MainContainer>
          <Popup diagTitle="Welcome!" diagText="Enter a username to start chatting anonymously, or sign in if you are a chat admin." open={open} handleClose={handleClose} setUser={setUsername}/>
        </div>
      );
}

export default ChatScreen;