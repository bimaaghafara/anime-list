// libs
import { useRouter } from "next/router";

// components
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// hooks
import useCollection from "src/hooks/useCollection";
import useDialog from "src/hooks/useDialog";

// styles
import sx from './styles';
import { useState } from "react";
import { Collections } from "@mui/icons-material";

const CollectionList = () => {
  const router = useRouter();
  const dialog = useDialog();
  const [dialogCollection, setDialogCollection] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const {
    isValidName,
    getCollections,
    addCollection,
    deleteCollection,
    // setCollections,
    // getCollectionByName,
    // setCollection,
  } = useCollection();

  // Add actions
  const handleSubmitAddNew = () => {
    if(dialogCollection?.name && isValidName(dialogCollection?.name)) {
      addCollection(dialogCollection);
      dialog.close();
    } else {
      setErrorMessage('Collection name is required & must be unique!')
    }
  };
  const handleOpenAddNew = () => {
    setErrorMessage();
    setDialogCollection(null);
    dialog.setTitle('Add New Collection');
    dialog.open();
    dialog.setType("add");
  }

  // Edit Actions
  const handleSubmitEdit = () => console.log('Edit', dialogCollection);
  const handleOpenEdit = (collection) => {
    setErrorMessage();
    setDialogCollection(collection);
    dialog.setTitle('Edit Collection');
    dialog.open();
    dialog.setType("edit");
  }

  // Delete Actions
  const handleSubmitDelete = () => {
    deleteCollection(dialogCollection?.name);
    dialog.close();
  };
  const handleOpenDelete = (collection) => {
    setErrorMessage();
    setDialogCollection(collection);
    dialog.setTitle('Delete Collection');
    dialog.open();
    dialog.setType("delete");
  }

  const handleSubmit = () => {
    if (dialog.type === "add") {
      handleSubmitAddNew();
    } else if (dialog.type === "edit") {
      handleSubmitEdit();
    } else {
      handleSubmitDelete();
    }
  }

  const renderDialogContent = () => {
    if (dialog.type === "add" || dialog.type === "edit")
      return (
        <Box sx={{ padding: '12px 0'}}>
          <TextField
            value={dialogCollection?.name || ''}
            onChange={e => setDialogCollection({
              ...dialogCollection,
              name: e.target.value
            })}
            fullWidth
            label="Collection Name"
            variant="outlined"
          />
          {errorMessage && (
            <Alert sx={{ mt: 2 }} severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography variant="subtitle2">{errorMessage}</Typography>
            </Alert>
          )}
        </Box>
      );
    return (
      <Box>Are you sure to delete collection &quot;{dialogCollection?.name}&quot;?</Box>
    );
  }

  return (
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
          <IconButton sx={sx.addNew} onClick={() => handleOpenDelete(collection)}>
            <DeleteIcon />
          </IconButton>
          <IconButton sx={sx.addNew} onClick={() => handleOpenEdit(collection)}>
            <EditIcon />
          </IconButton>
          {!(collection?.animes?.length) && <Box sx={sx.noCollection}>-</Box>}
          <Box>
              {collection?.animes?.map((e, i) => (
                <Box key={i} sx={sx.anime}>
                  <Box sx={sx.animeIamge(e.coverImage.large)} />
                  <Typography>{e.title.english}</Typography>
                  <Typography>{e.title.native}</Typography>
                </Box>
              ))}
          </Box>
          <hr />
        </Box>
      ))}
      <Dialog
        open={dialog.isOpen}
        onClose={dialog.close}
      >
        <DialogTitle>
          {dialog.title}
        </DialogTitle>
        <DialogContent sx={sx.dialogContent}>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={dialog.close}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CollectionList;