import * as React from 'react';
import {
  Typography,
  AppBar,
  Box,
    Toolbar
} from "@material-ui/core";

const DenseAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Innovatise Test
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default DenseAppBar;