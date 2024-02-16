import { useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  TextField,
  Toolbar,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NavBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FF43EC", color: "#FFFFFF" }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
        >
          <Typography noWrap={true} sx={{ flexBasis: "33%" }}>
            Eurovision Data Visualizer
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            sx={{
              "& input": { color: "#FFFFFF" },
              "& input::hover": { borderColor: "#FFFFFF" },
              "& input::placeholder": { color: "#FFFFFF" },
              "& input:focus": { borderColor: "#FFFFFF" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: "primary.main" },
            }}
            focused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: isFocused ? "primary.main" : "#FFFFFF" }}
                  />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{sx : { color: "#FFFFFF"}}}
          />
          <Typography sx={{ flexBasis: "33%", textAlign: "right" }}>
            STATISTICS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
