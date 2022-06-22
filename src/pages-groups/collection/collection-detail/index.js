// libs
import { useState } from "react";
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
import CollectionDialog from 'src/components/collection-dialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimeCard } from 'src/components/anime-card';

// hooks
import useCollection from "src/hooks/useCollection";
import useDialog from "src/hooks/useDialog";

// styles
import sx from './styles';

const CollectionDetail = () => {
  const {
    getCollection
  } = useCollection();
  const router = useRouter();
  const collection = getCollection(router?.query?.name);
  const dialog = useDialog();
  const [prevDialogCollectionName, setPrevDialogCollectionName] = useState();
  const [dialogCollection, setDialogCollection] = useState();
  const [dialogAnime, setDialogAnime] = useState();

  const handleOpenEdit = () => {
    setPrevDialogCollectionName(collection?.name);
    setDialogCollection(collection);
    dialog.setTitle('Edit Collection');
    dialog.open();
    dialog.setType("edit");
  }

  const handleOpenDeleteAnime = (anime) => {
    setDialogAnime(anime);
    setPrevDialogCollectionName(collection?.name);
    setDialogCollection(collection);
    dialog.setTitle('Delete Anime from Collection');
    dialog.open();
    dialog.setType("deleteAnime");
  }

  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <Typography variant="h5" sx={sx.collectionsTitle}>{collection?.name}</Typography>
        <IconButton sx={sx.addNew} onClick={handleOpenEdit}>
          <EditIcon />
        </IconButton>
        <hr />
        {!(collection?.animes?.length) && (
          <Typography sx={{ pt: 2 }}>This collection doesn&lsquo;t have any animes yet. </Typography>
        )}
        {collection?.animes?.map((anime) => 
          <Box key={anime.id} sx={sx.animeCard}>
            <IconButton
              sx={sx.delete}
              onClick={() => handleOpenDeleteAnime(anime)}
            >
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
      <CollectionDialog
        dialog={dialog}
        dialogCollection={dialogCollection}
        dialogAnime={dialogAnime}
        setDialogCollection={setDialogCollection}
        prevDialogCollectionName={prevDialogCollectionName}
        onSuccess={() => router.push(`/collection/${dialogCollection.name}`)}
      />
    </Box>
  )
}

export default CollectionDetail;