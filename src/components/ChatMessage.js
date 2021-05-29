import {
    Message,
    Avatar
  } from "@chatscope/chat-ui-kit-react";

function ChatMessage(props){
    let currentdate = new Date(); 
    let datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return(
        <div>
            <Message model={{
            message: props.message,
            sentTime: "just now",
            sender: props.sender,
            direction: props.direction
            }}>
                <Avatar src={props.avatar} name="Joe" />
                <Message.Footer>{props.mod?<b>{props.sender} (MODERATOR), {datetime}</b>:<div>{props.sender}, {datetime}</div>}</Message.Footer>
            </Message>
        </div>)
}

export default ChatMessage;