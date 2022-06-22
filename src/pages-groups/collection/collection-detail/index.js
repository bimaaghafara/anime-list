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

  const handleOpenEdit = () => {
    setPrevDialogCollectionName(collection?.name);
    setDialogCollection(collection);
    dialog.setTitle('Edit Collection');
    dialog.open();
    dialog.setType("edit");
  }

  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <Typography variant="h5" sx={sx.collectionsTitle}>{collection?.name}</Typography>
        <IconButton sx={sx.addNew} onClick={handleOpenEdit}>
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
      <CollectionDialog
        dialog={dialog}
        dialogCollection={dialogCollection}
        setDialogCollection={setDialogCollection}
        prevDialogCollectionName={prevDialogCollectionName}
        onSuccess={() => router.push(`/collection/${dialogCollection.name}`)}
      />
    </Box>
  )
}

export default CollectionDetail;