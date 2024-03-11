import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

interface ArtistProps {
  artistName: string;
  artistCountry: string;
  songName: string;
  youtubeURL: string;
  composers: string;
  countryId: string;
}

const ArtistCard = (props: ArtistProps) => {
  const {
    artistName,
    artistCountry,
    songName,
    youtubeURL,
    composers,
    countryId,
  } = props;

  const videoId = youtubeURL?.split("v=")[1];
  const thumbnailAddress = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const composersProcess: string[] = composers?.split(";") ?? [];
  const flagUrl: string = `https://flagsapi.com/${countryId?.toUpperCase()}/flat/24.png`; //Docs: https://flagsapi.com/#body

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
      <Link
        to={{
          pathname: `/artist/${artistName.toLowerCase()}`,
        }}
        state={{ props: props }}
      >
        <CardMedia
          sx={{
            height: "200px",
            cursor: "pointer",
          }}
          image={thumbnailAddress}
        />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          mt: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {songName}
        </Typography>
        <Typography variant="h6">{artistName} </Typography>
        <Typography sx={{ fontStyle: "italic" }}>
          ({formatComposers(composersProcess)})
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography>{artistCountry}</Typography>
          <img src={flagUrl} alt={artistCountry} />
        </Box>
      </Box>
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
