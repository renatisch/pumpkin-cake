import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from "react-router-dom";

type listItem = {
      item: string;
      isPrimary: boolean;
      icons: {
        primary: React.ReactNode
        secondary: React.ReactNode
      };
      path: string
}

interface Props {
    drawerWidth: number;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    listItems: Array<listItem>
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

function MainDrawer({drawerWidth, setDrawerOpen, isOpen, listItems}: Props) {
  const currentPage = useLocation()
  const theme = useTheme();
  return (
  <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="left"
    open={isOpen}
  >
    <DrawerHeader>
      <IconButton onClick={ () => setDrawerOpen(!isOpen)}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
      {listItems.map((item, index) => (
        item.isPrimary && (
        <Link key={item.item} to={item.path} style={{ textDecoration: "none", color:item.path === currentPage.pathname?(theme.palette.primary.main):("black")}}>
         <ListItem disablePadding key={index}>
          <ListItemButton>
            <ListItemIcon>
              {item.path===currentPage.pathname?(item.icons.primary):(item.icons.secondary)}
            </ListItemIcon>
            <ListItemText primary={item.item}/>
          </ListItemButton>
        </ListItem>
        </Link>
        )
      ))}
    </List>
    <Divider />
    <List>
      {listItems.map((item) => (
        !item.isPrimary &&
        <Link key={item.item} to={item.path} style={{ textDecoration: "none", color:item.path === currentPage.pathname?(theme.palette.primary.main):("black")}}>
        <ListItem key={item.item} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {item.path===currentPage.pathname?(item.icons.primary):(item.icons.secondary)}
            </ListItemIcon>
            <ListItemText primary={item.item} />
          </ListItemButton>
        </ListItem>
        </Link>
      ))}
    </List>
  </Drawer>
  )
}
export {MainDrawer, DrawerHeader}