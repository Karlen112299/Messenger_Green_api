import { Paper, AppBar, Toolbar, Typography, IconButton, Box, TextField, List, Avatar, ListItemButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { UserItem } from "./userItem";
import type { Chat } from "../../types";


export default function Sidebar({ onSelectChat }: { onSelectChat: (chat: Chat) => void }) {
  
    const [chats, setChats] = useState<Array<Chat>>([]);
    const [searchInput, setSearchInput] = useState("");
  
    const handleSearch = () => {
      if (searchInput.trim() && !chats.some(chat => chat.name === searchInput)) {
        setChats([{ id: chats.length + 1, name: searchInput}, ...chats]);
        setSearchInput("");
      }
    };
  
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };
    return (
        <Paper sx={{ width: 320, height: "100vh", display: "flex", flexDirection: "column" }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Chats
              </Typography>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ padding: 1, display: "flex", alignItems: "center" }}>
                <TextField 
                fullWidth 
                placeholder="Search by phone number" 
                variant="outlined" 
                size="small" 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
                onKeyDown={handleKeyDown} 
                />
                <IconButton onClick={handleSearch}>
                <SearchIcon />
                </IconButton>
          </Box>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {chats.map((chat) => (
                <UserItem key={chat.id} chat={chat} onClick={() => onSelectChat(chat)}/>
            ))}
          </List>
        </Paper>
      );
}