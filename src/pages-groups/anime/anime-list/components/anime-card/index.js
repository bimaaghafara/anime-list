// components
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

// styles
import sx from './styles';

export const AnimeCard = ({
  anime,
  onClick = () => {}
}) => {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <Box sx={sx.bannerIamge(anime?.bannerImage)} />
        <CardContent>
          <Typography sx={sx.title} gutterBottom variant="h5" component="div">
            <Box>{anime?.title?.english}</Box>
            <Box>{anime?.title?.native}</Box>
          </Typography>
          <Typography sx={sx.description} variant="body2" color="text.secondary">
            {
              anime?.description?.length > 300
                ? `${anime?.description?.slice(0, 300)} ...`
                : anime?.description
            }
          </Typography>
          <Typography sx={sx.link}>
            Click here for details
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}