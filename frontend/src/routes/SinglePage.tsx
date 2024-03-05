import {
  Box,
  Typography,
  CardMedia,
} from "@mui/material";
import data from "../../data/testData.json";

const SinglePage: React.FC = () => {
  const artistData = data.testData[0];
  const youtubeUrl = artistData.youtube_url;
  const videoId = youtubeUrl?.split("v=")[1];
  const thumbnailAddress = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const composers: string[] = artistData.composers?.split(";") ?? [];
  const flagUrl: string = `https://flagsapi.com/${artistData.to_country_id?.toUpperCase()}/flat/32.png`; //Docs: https://flagsapi.com/#body

  const formatComposers = (composers: string[]): string => {
    let output = "";

    if (composers.length === 1) {
      return composers[0]
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


  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#D2D2D2" }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
        <CardMedia
          sx={{ height: "500px", width: "500px" }}
          image={thumbnailAddress}
        ></CardMedia>
      </Box>
    </Box>
  );
};

export default SinglePage;
