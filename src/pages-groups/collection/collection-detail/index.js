// libs
import { useRouter } from "next/router";

// components
import {
  Box,
  // TextField,
  Typography,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
  IconButton,
  // Alert,
  // Snackbar
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimeCard } from 'src/components/anime-card';

// hooks
import useCollection from 'src/hooks/useCollection';

// styles
import sx from './styles';

const CollectionDetail = () => {
  const {
    getCollection
  } = useCollection();
  const router = useRouter();
  const collection = getCollection(router?.query?.name);

  console.log(collection);

  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <Typography variant="h5" sx={sx.collectionsTitle}>{collection?.name}</Typography>
        <IconButton
          sx={sx.addNew}
          // onClick={() => handleOpenEdit(collection)}
        >
          <EditIcon />
        </IconButton>
        <hr />
        {collection?.animes?.map((anime) => 
          <Box key={anime.id} sx={sx.animeCard}>
            <IconButton sx={sx.delete} onClick={() => console.log(anime)}>
              <DeleteIcon />
            </IconButton>
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={() => router.push(`/anime/${anime.id}`)}
              hiddenDescription
              hiddenClickHere
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CollectionDetail;