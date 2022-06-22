// libs
import { useState } from "react";
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
  Snackbar
} from "@mui/material";
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
  const [snackbar, setSnackbar] = useState();
  const {
    isUniqueName,
    getCollections,
    addCollection,
    editCollection,
    deleteCollection,
    // setCollections,
    // getCollectionByName,
    // setCollection,
  } = useCollection();

  const isValidRequiredCollectionName = () => {
    const valid = dialogCollection?.name;
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Collection name is required!'
      });
    }
    return valid;
  }

  const isValidUniqueCollectionName = () => {
    const valid = isUniqueName(dialogCollection?.name);
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Collection name should be unique!'
      });
    }
    return valid;
  }

  const isValidSpecialCHarsCollectionName = () => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const valid = !format.test(dialogCollection?.name);
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Collection name is should not have special characters!'
      });
    }
    return valid;
  }

  const isValidDifferentCollectionName = () => {
    const valid = prevDialogCollectionName.toLowerCase() != dialogCollection?.name.toLowerCase();
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Collection name should be different with the previous one!'
      });
    }
    return valid;
  }

  // Add actions
  const handleSubmitAddNew = () => {
    if (!isValidRequiredCollectionName()) return;
    if (!isValidUniqueCollectionName()) return;
    if (!isValidSpecialCHarsCollectionName()) return;
    addCollection(dialogCollection);
    dialog.close();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes add new collection!'
    });
  };
  const handleOpenAddNew = () => {
    setDialogCollection(null);
    dialog.setTitle('Add New Collection');
    dialog.open();
    dialog.setType("add");
  }

  // Edit Actions
  const handleSubmitEdit = () => {
    if (!isValidDifferentCollectionName()) return;
    if (!isValidRequiredCollectionName()) return;
    if (!isValidUniqueCollectionName()) return;
    if (!isValidSpecialCHarsCollectionName()) return;
    editCollection(prevDialogCollectionName, dialogCollection);
    dialog.close();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes edit collection!'
    });
  }
  const handleOpenEdit = (collection) => {
    setPrevDialogCollectionName(collection?.name);
    setDialogCollection(collection);
    dialog.setTitle('Edit Collection');
    dialog.open();
    dialog.setType("edit");
  }

  // Delete Actions
  const handleSubmitDelete = () => {
    deleteCollection(dialogCollection?.name);
    dialog.close();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes delete collection!'
    });
  };
  const handleOpenDelete = (collection) => {
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
        </Box>
      );
    return (
      <Box>Are you sure to delete collection &quot;{dialogCollection?.name}&quot;?</Box>
    );
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
        <Snackbar
          open={snackbar?.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {snackbar?.open && (
            <Alert onClose={() => setSnackbar()} severity={snackbar?.severity} sx={{ width: '100%' }}>
              {snackbar?.message}
            </Alert>
          )}
        </Snackbar>
      </Box>
    </Box>
  )
}

export default CollectionList;