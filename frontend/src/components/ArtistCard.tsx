import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

interface ArtistProps {
  artistName: string;
  artistCountry: string;
  songName: string;
  youtubeURL: string;
  composers: string;
  countryId: string;
}

const ArtistCard = ({
  artistName,
  artistCountry,
  songName,
  youtubeURL,
  composers,
  countryId,
}: ArtistProps) => {
  const videoId = youtubeURL?.split("v=")[1];
  const thumbnailAddress = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const composersProcess: string[] = composers?.split(";") ?? [];
  const flagUrl: string = `https://flagsapi.com/${countryId?.toUpperCase()}/flat/32.png`; //Docs: https://flagsapi.com/#body

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

  const card = (
    <CardContent>
      <CardMedia
        sx={{
          height: "200px",
          cursor: "pointer",
        }}
        image={thumbnailAddress}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography variant="h4">{artistName} </Typography>
        <img src={flagUrl} alt={artistCountry} />
      </Box>
      <Typography>{songName}</Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        ({formatComposers(composersProcess)})
      </Typography>
    </CardContent>
  );

  return (
    <Card
      sx={{
        width: "300px",
        border: "1px solid",
        borderRadius: "4px",
        backgroundColor: "#D2D2D2",
      }}
    >
      {card}
    </Card>
  );
};

export default ArtistCard;
