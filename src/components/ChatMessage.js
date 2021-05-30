import {
    Message,
    Avatar
  } from "@chatscope/chat-ui-kit-react";

function ChatMessage(props){
    let currentdate = new Date(props.date); 
    let mins=currentdate.getMinutes()<10?"0"+currentdate.getMinutes():currentdate.getMinutes()+"",
    secs=currentdate.getSeconds()<10?"0"+currentdate.getSeconds():currentdate.getSeconds()+""
    let datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + mins + ":" 
                + secs;
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