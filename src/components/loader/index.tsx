import { Box, CircularProgress, SxProps } from "@mui/material";

export const Loader = ({centralized, color, sx}:{centralized?:boolean; color?:string,sx?:SxProps}) => {
    return (
        <Box sx={sx?sx:centralized?{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100%'}:{}}>
            <CircularProgress style={color ? {color} : {}}/>
        </Box>
    )
}