import { Link } from "react-router-dom";
import { AppBar, Box, Typography, Toolbar } from "@mui/material";

const NavBar: React.FC = () => {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FF43EC", color: "#FFFFFF" }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
        >
          <Link to={"/"}>
            <Typography noWrap={true}>Eurovision Data Visualizer</Typography>
          </Link>
          <Link to={"/statistics"}>
            <Typography sx={{ textAlign: "right" }}>STATISTICS</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
