import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchInputProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ handleSearch }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <TextField
      label="Search"
      variant="outlined"
      focused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: isFocused ? "primary.main" : "#00000" }} />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{ sx: { color: "#00000" } }}
    />
  );
};

export default SearchInput;
