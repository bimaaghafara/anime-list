// libs
import { useRouter } from 'next/router';

// components
import {
  Box,
  Button,
  Typography,
  Pagination,
  PaginationItem,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { AnimeCard } from 'src/components/anime-card';
import AddIcon from '@mui/icons-material/Add';

// styles
import sx from './styles';

// graphql
import { useAnimeListQuery } from './graphql/anime-list';

const AnimeList = () => {
  const router = useRouter();
  const page = Number(router?.query?.page || 1);
  const perPage = Number(router?.query?.perPage || 10);
  const { data, isLoading, error } = useAnimeListQuery(
    { page, perPage },
    { enabled: router?.isReady }
  );

  if ( error ) return <div className='loader'>Error!</div>;
  if ( isLoading || !data ) return <div className='loader'>Loading . . .</div>;

  const animeList = data?.Page?.media || [];
  const totalPage = data?.Page?.pageInfo?.total || 0;
  const goToPage = ({page, perPage }) => {
    router.push(`/anime?page=${page}&perPage=${perPage}`);
  }

  const handleOpenAddAnimeToCollection = () => {}

  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <Box sx={sx.titleContainer}>
          <Typography variant="h5" sx={sx.title}>Anime List</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={sx.addToCollection}
            onClick={handleOpenAddAnimeToCollection}
          >
            Collection
          </Button>
        </Box>
        {animeList.map((anime) => 
          <Box key={anime.id} sx={sx.animeCard}>
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={() => router.push(`/anime/${anime.id}`)}
            />
          </Box>
        )}
        <Box sx={sx.paginationContainer}>
          <FormControl size="small">
            <Select
              value={perPage}
              onChange={(e) => goToPage({ page: 1, perPage: e.target.value })}
            >
              {[5, 10, 25, 50].map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          <Pagination
            page={page}
            count={Math.ceil((totalPage > 5000 ? 5000 : totalPage) / perPage)}
            onChange={(e, value) => goToPage({ page: value, perPage })}
            renderItem={(item) => <PaginationItem {...item} />}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AnimeList;
