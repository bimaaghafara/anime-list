import { Box, Card, CardActionArea, CardContent, Skeleton } from '@mui/material';

import contentSx from "../../styles";

const Skeletons = () => {
  return (
    <>
      {Array(10).fill().map((e, i) => (
        <Box key={i} sx={contentSx.animeCard}>
          <Card>
            <CardActionArea>
              <Skeleton variant="rectangular" width="100%" sx={{ pb: "40%" }} />
              <CardContent>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </>
  )
}

export default Skeletons;