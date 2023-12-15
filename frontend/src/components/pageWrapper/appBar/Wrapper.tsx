import MainAppBar from "./AppBar";
import React, { ReactNode } from 'react'
import { Box } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import  {MainDrawer, DrawerHeader} from "./Drawer";
import { NavBarCategories } from "./NavBarCategories";

interface Props {
    isDrawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode
}

export default function Wrapper({isDrawerOpen, setDrawerOpen, children}: Props) {
  const drawerWidth = 240
  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MainAppBar drawerwidth={drawerWidth} open={isDrawerOpen} setopen={setDrawerOpen}/>
        <MainDrawer drawerWidth={drawerWidth} isOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} listItems={NavBarCategories}/>
        <DrawerHeader/>
        {children}
    </Box>
  )
}