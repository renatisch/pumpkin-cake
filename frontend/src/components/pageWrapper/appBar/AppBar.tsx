import * as React from 'react';
import { styled, } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240

interface AppBarProps {
    open?: boolean;
    drawerwidth: number
}

interface MainAppBarProps {
  open?: boolean;
  drawerwidth: number
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
export default function MainAppBar({open, setopen, drawerwidth}: MainAppBarProps) {
  const handleDrawerOpen = () =>{
    setopen(!open)
  }

  return (
    <AppBar position="fixed" open={open} drawerwidth={drawerwidth}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
            Services
        </Typography>
        </Toolbar>
  </AppBar>
  )
}