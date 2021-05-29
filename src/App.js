import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  ConversationHeader,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import testAvatar from './logo.svg'
import ChatMessage from './components/ChatMessage'
import React from "react";

function App() {
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
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Content userName="NNMG Studios" info="General Support Room" />         
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
    </div>
  );
}

export default App;
