// libs
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import {
  Box,
  Typography,
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
        <Box sx={sx.titleContainer}>
          <Typography>{anime?.title?.english}</Typography>
          <Typography>{anime?.title?.native}</Typography>
        </Box>
        <Box sx={sx.description} dangerouslySetInnerHTML={{ __html: anime?.description }} />
      </Box>
    </Box>
  )
}

export default AnimeDetail;