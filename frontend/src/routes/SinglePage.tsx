import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import data from "../../data/testData.json";
import YouTube from "react-youtube";

const SinglePage: React.FC = () => {
  const artistData = data.testData[0];
  const youtubeUrl = artistData.youtube_url;
  const videoId = youtubeUrl?.split("v=")[1];
  const composers: string[] = artistData.composers?.split(";") ?? [];
  const flagUrl: string = `https://flagsapi.com/${artistData.to_country_id?.toUpperCase()}/flat/32.png`; //Docs: https://flagsapi.com/#body

  const formatComposers = (composers: string[]): string => {
    let output = "";

    if (composers.length === 1) {
      return composers[0];
    }

    for (let i = 0; i < composers.length; i++) {
      if (i === composers.length - 1) {
        output += " & ";
      } else if (i > 0) {
        output += ", ";
      }
      output += composers[i];
    }
    return output;
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const options = {
    height: isSmallScreen ? "200" : "390",
    width: isSmallScreen ? "320" : "640",
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#D2D2D2" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "1rem"
        }}
      >
        <Box>
          <Typography variant="h3">{artistData.performer}</Typography>
          <Typography variant="h4">{artistData.song}</Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography variant="h5">{artistData.to_country}</Typography>
            <img src={flagUrl} alt={artistData.to_country} />
          </Box>
          <Typography>Lyricist: {artistData.lyricists}</Typography>
          <Typography>Composers: {formatComposers(composers)}</Typography>
          <Typography>Contest year: {artistData.year}</Typography>
          <Typography>
            Audience points: {artistData.points_tele_final}
          </Typography>
          <Typography>Jury points: {artistData.points_jury_final}</Typography>
          <Typography>
            Total points:{" "}
            {artistData.points_jury_final + artistData.points_tele_final}
          </Typography>
          <Typography>Final place: {artistData.place_final}</Typography>
        </Box>
          <YouTube videoId={videoId} opts={options} />
      </Box>
    </Box>
  );
};

export default SinglePage;
