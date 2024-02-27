import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ArtistCard = () => {

  type ArtistData = {
    year: number;
    to_country_id: string;
    to_country: string;
    performer: string;
    song: string;
    youtube_url: string;
  };

  const [artistData, setArtistData] = useState<ArtistData[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8000/testdata"); // jsonserver address
        const data = await response.json();
        setArtistData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{artistData[0].performer}</Typography>
        <CardMedia>
        </CardMedia>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
