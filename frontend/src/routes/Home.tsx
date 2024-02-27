import Banner from "../components/Banner";
import { Box, Typography } from "@mui/material";
import ArtistCard from "../components/ArtistCard";

const Home: React.FC = () => {
  return (
    <Box>
      <Banner />
        <Box sx={{ backgroundColor: "primary.main", height: "500px", p: 2}}>
          <Typography variant="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "3rem",
              },
              textAlign: "center"
            }}
          >
            Welcome to Eurovision data visualizer app!
          </Typography>
        </Box>
        <Box sx={{backgroundColor: "#1c1c1c", color:"#FFFFFF", height: "500px"}}>
            Cards will appear here
            <ArtistCard></ArtistCard>
        </Box>
    </Box>
  );
};

export default Home;
