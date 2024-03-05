import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import data from "../../data/testData.json";

const ArtistCard = () => {
  const artistData = data.testData[0];
  const youtubeUrl = artistData.youtube_url;
  const videoId = youtubeUrl?.split("v=")[1];
  const thumbnailAddress = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const composers: string[] = artistData.composers?.split(";") ?? [];

  const formatComposers = (composers: string[]): string => {
    let output = "";
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

  const card = (
    <CardContent sx={{ width: "300px", border:"1px solid", borderRadius: "4px" }}>
      <CardMedia
        sx={{
          height: "200px",
        }}
        image={thumbnailAddress}
      ></CardMedia>
      <Typography variant="h4">{artistData.performer}</Typography>
      <Typography>{artistData.song}</Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        ({formatComposers(composers)})
      </Typography>
    </CardContent>
  );

  return (
    <Box>
      <Card>{card}</Card>
    </Box>
  );
};

export default ArtistCard;
