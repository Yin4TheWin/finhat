import {
    MainContainer,
    ChatContainer,
    MessageList,
    ConversationHeader,
    MessageInput,
  } from "@chatscope/chat-ui-kit-react";
import testAvatar from '../images/profile.png'
import modAvatar from '../images/mod.svg'
import ChatMessage from './ChatMessage'
import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Popup from './Popup'
import uniqid from 'uniqid'
import { Helmet } from 'react-helmet'
import useSound from 'use-sound';
import Ring from '../sounds/ringtone.ogg'

let unsubscribe

function ChatScreen(props){
    const [messages, setMessages] = React.useState([])
    const [newMessage, setNewMessage]=React.useState("")
    const [open, setOpen] = React.useState(!props.userID.length>0);
    const [username, setUsername] = React.useState("")
    const [uid, setUID] = React.useState(firebase.auth().currentUser?firebase.auth().currentUser.uid:uniqid())
    const [mods, setMods] = React.useState([])
    const [focus, setFocus] = React.useState(true)
    const [missed, setMissed] = React.useState(0)
    const [play] = useSound(Ring)
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
    // User has switched back to the tab
    const onFocus = () => {
        setFocus(true)
        setMissed(0)
        console.log('Tab is in focus');
    };
    
    // User has switched away from the tab (AKA tab is hidden)
    const onBlur = () => {
        setFocus(false)
        console.log('Tab is blurred');
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
            if(!focus&&messages.length!==0&&messages.length!==doc.data().messages.length){
                setMissed(missed+1)
                play()
            }
            setMessages(doc.data().messages.map((element)=>{
            return(<ChatMessage date={element.date} 
                message={element.message} sender={element.sender} avatar={element.mod?modAvatar:testAvatar} 
                direction={uid===element.uid?"outgoing":"incoming"} mod={element.mod}/>)
            }))
            setMods(doc.data().moderators)
        });
    },[db, uid, props.topicID, focus, play, messages.length, missed])
    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        // Specify how to clean up after this effect:
        return () => {
          window.removeEventListener('focus', onFocus);
          window.removeEventListener('blur', onBlur);
        };
      });
      return (
        <div style={{ position: "relative", height: "100vh" }}>
        <Helmet>
            <title>{ missed===0?props.name+" Live Chat":props.name+" Live Chat ("+missed+")" }</title>
        </Helmet>
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