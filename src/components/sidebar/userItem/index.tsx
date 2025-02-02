import { ListItemButton, Box, Typography } from "@mui/material";
import { Chat } from "../../../types";

export function UserItem ({chat, onClick}:{chat:Chat,onClick:()=>void}) {
    
    return (
        <ListItemButton onClick={onClick} key={chat.id} sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {chat.name}
          </Typography>
        </Box>
      </ListItemButton>
    )
}