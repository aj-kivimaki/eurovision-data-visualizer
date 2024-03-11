import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <TextField
      label="Search"
      variant="outlined"
      focused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{ color: isFocused ? "primary.main" : "#00000" }}
            />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{ sx: { color: "#00000" } }}
    />
  );
};

export default SearchInput;