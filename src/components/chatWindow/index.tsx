import {  useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, Divider, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useLazyGetMessageQuery, useSendMessageMutation } from "../../store/api/greenApi";
import type { Chat, MessageType } from "../../types";
import { Toaster } from "../toaster";

export function ChatWindow({ selectedChat }: { selectedChat: Chat | null }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<MessageType>>([]);
    const chatMessages = messages.filter((message)=>message?.chatId === selectedChat?.name)
    const[sendMessage, {isSuccess,isError, error}] = useSendMessageMutation();
    const [getNotification, {data,isSuccess:isNotificationSuccess,isFetching}] = useLazyGetMessageQuery()

    const handleSendMessage = () => {
      if (message.trim()) {
        sendMessage(
            {
                data:{
                    idInstance:localStorage.getItem('idInstance') || '',
                    apiTokenInstance:localStorage.getItem('apiTokenInstance') || ''
                },
                message:message,
                chatId:`${selectedChat && selectedChat.name}@c.us`
            })
      }
    };

  useEffect(()=>{
    if(isSuccess){
        setMessages([...messages,{id:messages.length+1,message:message,type:'sent',chatId:selectedChat?.name}] as MessageType[]);
        setMessage("");
    }
  },[isSuccess])

  useEffect(() => {
    let interval:number;
    if(selectedChat && selectedChat.id){
        const fetchNotifications = () => {
            getNotification({
              idInstance: localStorage.getItem("idInstance") || "",
              apiTokenInstance: localStorage.getItem("apiTokenInstance") || "",
            });
        };
         interval = setInterval(fetchNotifications, 5000);
    }
    return () => clearInterval(interval);
  }, [selectedChat]);

useEffect(()=>{
    if(!isFetching && isNotificationSuccess){
          if(isNotificationSuccess && data?.body.typeWebhook === 'incomingMessageReceived' && data.body.senderData.chatId === `${selectedChat?.name}@c.us`){
           const ifMessageExists = messages.find((message)=>message.id === data.body.idMessage)
            if(!ifMessageExists)
            setMessages([...messages,{id:data.body.idMessage,message:data?.body?.messageData?.textMessageData?.textMessage,type:'received',chatId:selectedChat?.name}] as MessageType[]);
        }
    }

},[isFetching,isNotificationSuccess])

    return (
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6">{selectedChat ? selectedChat.name : "Select the chat"}</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2, display: "flex", flexDirection: "column" }}>
            {chatMessages.map((msg, index) => {
                if(msg.type === 'sent'){
                    return <Box key={index} sx={{ alignSelf: "flex-end", backgroundColor: "#DCF8C6", padding: 1, borderRadius: 2, marginBottom: 1 }}>
                        {msg.message}
                    </Box>
                }else{
                    return <Box key={index} sx={{ alignSelf: "flex-start", backgroundColor: "#2c272a", padding: 1, borderRadius: 2, marginBottom: 1 }}>
                    {msg.message}
                </Box>
                }
            }
            )}
        </Box>
        <Divider />
        <Box sx={{ display: "flex", padding: 1, alignItems: "center" }}>
         {selectedChat &&  
            (<>
                <InputBase
                    sx={{ flexGrow: 1, padding: 1, border: "1px solid #ccc", borderRadius: 2 }}
                    placeholder="Enter the message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} />
                <IconButton onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </>)
        }
        </Box>
       <Toaster isOpen={isError} error={error}/>
      </Box>
    );
  }