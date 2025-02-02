import { Box} from "@mui/material";
import Sidebar from "../sidebar";
import { useState } from "react";
import { ChatWindow } from "../chatWindow";
import type { Chat } from "../../types";

export default function Messenger() {
    const [selectedChat, setSelectedChat] = useState<Chat>();
    return (
        <Box sx={{ display: "flex", height: "100vh",background:"#202c33" }}>
            <Sidebar onSelectChat={setSelectedChat}/>
            {selectedChat ? <ChatWindow selectedChat={selectedChat} /> : <ChatWindow selectedChat={null} />}
        </Box>
      );
}