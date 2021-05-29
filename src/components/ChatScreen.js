import {
    MainContainer,
    ChatContainer,
    MessageList,
    ConversationHeader,
    MessageInput,
  } from "@chatscope/chat-ui-kit-react";
import testAvatar from '../logo.svg'
import ChatMessage from './ChatMessage'
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Popup from './Popup'

function ChatScreen(props){
    const [messages, setMessages] = React.useState([{
        message: "Hello world",
        sender: "Franklin",
        direction: "outgoing"
      },{
        message: "Hello world!",
        sender: "Bob",
        direction: "incoming",
        mod: true
      },{
        message: "Hello world",
        sender: "Bob",
        direction: "incoming",
        mod: true
      }].map((element)=>{
        return(<ChatMessage message={element.message} sender={element.sender} avatar={testAvatar} direction={element.direction} mod={element.mod}/>)
      }))
      const [newMessage, setNewMessage]=React.useState("")
      const [open, setOpen] = React.useState(true);
      const handleOpen = () => {
        setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
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
                setMessages([...messages, <ChatMessage message={newMessage} sender="Franklin" avatar={testAvatar} direction="outgoing"/>])
                console.log(messages)
                }}/>
            </ChatContainer>
          </MainContainer>
          <Popup diagTitle="Welcome!" diagText="Enter a username to start chatting anonymously, or sign in if you are a chat admin." open={open} handleClose={handleClose}/>
        </div>
      );
}

export default ChatScreen;