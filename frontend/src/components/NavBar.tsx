import { AppBar, Box, Typography, TextField, Toolbar } from "@mui/material";

const NavBar: React.FC = () => {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FF43EC", color: "#FFFFFF" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography noWrap={true} sx={{ flexBasis: "33%" }}>
            Eurovision Data Visualizer
          </Typography>
          <TextField label="Search" variant="standard" sx={{}} />
          <Typography sx={{ flexBasis: "33%", textAlign: "right" }}>
            STATISTICS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
