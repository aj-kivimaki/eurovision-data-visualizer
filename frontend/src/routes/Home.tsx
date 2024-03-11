import { useState, useEffect, ChangeEvent } from "react";
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
import ArtistCard from "../components/ArtistCard";
import SearchInput from "../components/SearchInput";
import { EurovisionData } from "../types/EurovisionModel";

const Home: React.FC = () => {
  const [artists, setArtists] = useState<EurovisionData[]>([]);
  const [year, setYear] = useState<number>(2023);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const baseUrl = "http://localhost:8080/eurovision";
    const getArtists = async () => {
      try {
        const response = await fetch(`${baseUrl}?year=${year}`);
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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterArtistCards = (
    array: EurovisionData[],
    filterValue: string
  ): EurovisionData[] => {
    const filteredArtists = array.filter((artist) =>
      artist.performer.toLowerCase().startsWith(filterValue.toLowerCase())
    );
    return filteredArtists;
  };

  const filteredArtists = filterArtistCards(artists, search);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            p: "1rem",
          }}
        >
          <SearchInput handleSearch={handleSearch} />
          <FormControl>
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
        <Box
          sx={{
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "center",
            mx: "2rem",
            gap: "2rem",
            mb: "2rem",
          }}
        >
          {/* Filter artists before mapping them and display a message if no matches are found */}
          {filteredArtists.length === 0 ? (
            <>
              <Typography sx={{height:"350px", color:"#000", pt:"1rem"}}>No matches found with "{search}"</Typography>
            </>
          ) : (
            filteredArtists.map((artist, index) => (
              <ArtistCard
                {...artist}
                key={`${artist.performer}_${index}`}
                artistName={artist.performer}
                artistCountry={artist.to_country}
                songName={artist.song}
                youtubeURL={artist.youtube_url}
                composers={artist.composers}
                countryId={artist.to_country_id}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
