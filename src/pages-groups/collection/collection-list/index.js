// libs
import { useState } from "react";
import { useRouter } from "next/router";

// components
import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CollectionDialog from 'src/components/collection-dialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// hooks
import useCollection from "src/hooks/useCollection";
import useDialog from "src/hooks/useDialog";

// styles
import sx from './styles';

const CollectionList = () => {
  const router = useRouter();
  const dialog = useDialog();
  const [prevDialogCollectionName, setPrevDialogCollectionName] = useState();
  const [dialogCollection, setDialogCollection] = useState();
  const { getCollections } = useCollection();

  const handleOpenAddNew = () => {
    setDialogCollection(null);
    dialog.setTitle('Add New Collection');
    dialog.open();
    dialog.setType("add");
  }

  const handleOpenEdit = (collection) => {
    setPrevDialogCollectionName(collection?.name);
    setDialogCollection(collection);
    dialog.setTitle('Edit Collection');
    dialog.open();
    dialog.setType("edit");
  }

  const handleOpenDelete = (collection) => {
    setDialogCollection(collection);
    dialog.setTitle('Delete Collection');
    dialog.open();
    dialog.setType("delete");
  }

  return (
    <Box sx={sx.root}>
      <Box sx={sx.content}>
        <Typography variant="h5" sx={sx.collectionsTitle}>Collections</Typography>
        <Button variant="contained" sx={sx.addNew} onClick={handleOpenAddNew}>
          Add New
        </Button>
        <hr />
        {getCollections().map(collection => (
          <Box key={collection.name}>
            <Typography
              variant="h6"
              sx={sx.collectionName}
              onClick={() => router.push(`/collection/${collection.name}`)}
            >
              {collection.name}
            </Typography>
            <IconButton sx={sx.addNew} onClick={() => handleOpenEdit(collection)}>
              <EditIcon />
            </IconButton>
            <IconButton sx={sx.addNew} onClick={() => handleOpenDelete(collection)}>
              <DeleteIcon />
            </IconButton>
            <IconButton sx={sx.addNew} onClick={() => router.push(`/collection/${collection.name}`)}>
              <FormatListBulletedIcon />
            </IconButton>
            {!(collection?.animes?.length) && <Box sx={sx.noCollection}>-</Box>}
            <Box sx={{ mt: 1 }}>
                {collection?.animes?.map((e, i) => (
                  <Box key={i} sx={sx.anime}>
                    <Box sx={sx.animeIamge(e.bannerImage || e.coverImage?.medium)} />
                    <Typography>{e.title.english}</Typography>
                    <Typography>{e.title.native}</Typography>
                  </Box>
                ))}
            </Box>
            <hr />
          </Box>
        ))}
        <CollectionDialog
          dialog={dialog}
          dialogCollection={dialogCollection}
          setDialogCollection={setDialogCollection}
          prevDialogCollectionName={prevDialogCollectionName}
        />
      </Box>
    </Box>
  )
}

export default CollectionList;