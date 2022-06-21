// libs
import { useRouter } from 'next/router';

// components
import { Box, Typography } from '@mui/material';
import { AnimeCard } from './components/anime-card';
import { useAnimeListQuery } from './graphql/anime-list';

// styles
import sx from './styles';

export default function AnimeList() {
  const router = useRouter();
  const { data, isLoading, error } = useAnimeListQuery({
    page: 1,
    perPage: 10
  });

  if ( error ) return <>Error!</>

  if ( isLoading || !data ) return <>Loading...</>

  const animeList = data?.Page?.media || [];
  return (
    <Box sx={sx.root}>
      <Typography sx={sx.title}>Anime List</Typography>
      {animeList.map((anime) => 
        <Box key={anime.id} sx={sx.animeCard}>
          <AnimeCard
            key={anime.id}
            anime={anime}
            onClick={() => router.push(`/anime/${anime.id}`)}
          />
        </Box>
      )}
    </Box>
  )
}
