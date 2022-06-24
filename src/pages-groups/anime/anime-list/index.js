// libs
import { useState } from 'react';
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
  MenuItem,
  Checkbox
} from '@mui/material';
import CollectionDialog from 'src/components/collection-dialog';
import Skeletons from './components/skeletons';
import { AnimeCard } from 'src/components/anime-card';
import AddIcon from '@mui/icons-material/Add';

// styles
import sx from './styles';

// hooks
import useDialog from "src/hooks/useDialog";

// graphql
import { useAnimeListQuery } from './graphql/anime-list';

const AnimeList = () => {
  const router = useRouter();
  const dialog = useDialog();
  const [dialogCollection, setDialogCollection] = useState();
  const [dialogAnimes, setDialogAnimes] = useState([]);
  const page = Number(router?.query?.page || 1);
  const perPage = Number(router?.query?.perPage || 10);
  const { data, isLoading, error } = useAnimeListQuery(
    { page, perPage },
    { enabled: router?.isReady }
  );

  const animeList = data?.Page?.media || [];
  const totalPage = data?.Page?.pageInfo?.total || 0;
  const goToPage = ({page, perPage }) => {
    router.push(`/anime?page=${page}&perPage=${perPage}`);
  }

  const handleOpenAddAnimeToCollection = () => {
    dialog.setTitle('Add Anime to Collection');
    dialog.open();
    dialog.setType("addAnime");
  }

  const handleChangeCheckboxAnime = (e, anime) => {
    if (e.target.checked) {
      setDialogAnimes([...dialogAnimes, anime])
    } else {
      setDialogAnimes(dialogAnimes.filter(e => e.id !== anime.id))
    }
  }

  const renderContent = () => {
    if ( error ) return <div className='loader'>Error!</div>;
    if ( isLoading || !data) return <Skeletons />;
    return (
      <>
        {animeList.map((anime) => 
          <Box key={anime.id} sx={sx.animeCard}>
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={() => router.push(`/anime/${anime.id}`)}
            />
            <Checkbox sx={sx.checkboxAnime} onChange={(e) => handleChangeCheckboxAnime(e, anime)} />
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
        <CollectionDialog
          dialog={dialog}
          dialogCollection={dialogCollection}
          setDialogCollection={setDialogCollection}
          animes={dialogAnimes}
        />
      </>
    )
  }

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
            disabled={isLoading || !data}
          >
            Collection
          </Button>
        </Box>
        {renderContent()}
      </Box>
    </Box>
  )
}

export default AnimeList;
