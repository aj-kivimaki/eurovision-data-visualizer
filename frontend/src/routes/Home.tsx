import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
useState;

const Home: React.FC = () => {
  const [artists, setArtists] = useState([]);
  const [year, setYear] = useState<number>(2023);

  useEffect(() => {
    const baseUrl = "http://localhost:8080/eurovision";
    const getArtists = async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.log(error);
      }
    };
    getArtists();
  }, [year]);

  const populateMenuItems = () => {
    const menuItems = [];
    for (let i = 2023; i > 1955; i--) {
      menuItems.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return menuItems;
  };

  const handleYear = (event: SelectChangeEvent<number>) => {
    const inputValue = Number(event.target.value);
    setYear(inputValue);
  };

  return (
    <Box>
      <Banner />
      <Box sx={{ backgroundColor: "primary.main", height: "500px", p: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "3rem",
            },
            textAlign: "center",
          }}
        >
          Welcome to Eurovision data visualizer app!
        </Typography>
      </Box>
      <Box sx={{ color: "#FFFFFF" }}>
        <Box sx={{ p: "1rem" }}>
          <FormControl sx={{}}>
            <InputLabel>Year</InputLabel>
            <Select
              label="Year"
              autoWidth
              defaultValue={2023}
              onChange={handleYear}
            >
              {populateMenuItems()}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
