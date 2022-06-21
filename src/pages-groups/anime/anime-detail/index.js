// libs
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import {
  Box,
  Typography,
  Grid,
  Paper
} from '@mui/material';

// styles
import sx from './styles';

// graphql
import { useAnimeDetailQuery } from './graphql/anime-detail';

const AnimeDetail = () => {
  const router = useRouter();
  const { data, isLoading, error } = useAnimeDetailQuery(
    { id: Number(router?.query?.id || 0) },
    { enabled: router?.isReady }
  );
  
  if ( error ) return <>Error!</>
  if ( isLoading || !data ) return <>Loading...</>

  const anime = data?.Media;

  return (
    <Box sx={sx.root}>
      <Box sx={sx.bannerImage} component="img" src={anime?.bannerImage} />
      <Box sx={sx.content}>
        <Box sx={sx.headerContainer}>
          <Box sx={sx.headerImage} component="img" src={anime?.coverImage?.large} />
          <Box sx={sx.headerRight}>
            <Box sx={sx.titleContainer}>
              <Typography>{anime?.title?.english}</Typography>
              <Typography>{anime?.title?.native}</Typography>
            </Box>
            <Box sx={sx.description} dangerouslySetInnerHTML={{ __html: anime?.description }} />
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>xs=6 md=8</Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 2 }}>xs=6 md=4</Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AnimeDetail;