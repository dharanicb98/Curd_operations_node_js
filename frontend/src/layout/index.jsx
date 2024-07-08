import React from 'react'

import { Drawer, List, ListItem, ListItemText, Box, Button, Menu, MenuItem, IconButton, Toolbar, AppBar, CssBaseline, useMediaQuery, Container } from '@mui/material';
import AppHeader from './header';

function Layout({children}) {
  return (
    <>
     <CssBaseline />
     <AppHeader />
     <Container sx={{ mt: 2 , overflowX:"auto"}}>
        {children}
      </Container>
    </>
  )
}

export default Layout