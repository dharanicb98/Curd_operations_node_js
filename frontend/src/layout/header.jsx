import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const AppHeader = () => {
  return (
    <AppBar position="static" width={"100%"} sx={{width:"100%"}}>
      <Toolbar>
        <Box  sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* <img src="/path/to/your/company/logo.png" alt="Company Logo" style={{ height: 40, marginRight: 10 }} /> */}
          <Typography variant="h6" component="div">
            Wylo
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/posts">
            Posts
          </Button>
          <Button color="inherit" component={Link} to="/add">
            <AddIcon />
            Add Post
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
