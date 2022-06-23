// libs
import { useState } from "react";

// components
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Autocomplete,
  Collapse,
  Paper,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// hooks
import useCollection from "src/hooks/useCollection";

// styles
import sx from './styles';

const CollectionDialog = ({
  dialog,
  dialogCollection = null,
  setDialogCollection,
  prevDialogCollectionName,
  onSuccess = () => {},
  animes = [],
  dialogAnime,
}) => {
  const [snackbar, setSnackbar] = useState();
  const [collapseShowAddCollection, setCollapseShowAddCollection] = useState(false);
  const [collapseCollection, setCollapseCollection] = useState({});
  const {
    getCollections,
    addCollection,
    editCollection,
    deleteCollection,
    addAnimesToCollection,
    deleteAnimeFromCollection,
  } = useCollection();
  const renderDialogContent = () => {
    if (dialog.type === "add" || dialog.type === "edit") {
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
    }
    if (dialog.type === "delete") {
      return (
        <Box>Are you sure to delete collection &quot;{dialogCollection?.name}&quot;?</Box>
      );
    }
    if (dialog.type === "addAnime") {
      const toggleCollapseShowAddCollection = () => setCollapseShowAddCollection(!collapseShowAddCollection);
      return (
        <Box>
          <Box>
            <Autocomplete
              sx={{ mt: 1 }}
              value={dialogCollection}
              onChange={(e, newValue) => {
                setDialogCollection(newValue);
              }}
              options={(getCollections() || []).map(e => ({
                ...e, label: e.name
              }))}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              renderInput={(params) => <TextField {...params} label="Collection" />}
            />
          </Box>
          <Box sx={{ m: '12px 0', fontSize: '12px' }}>
            <span>Select collection or </span>
            <Typography
              variant="span"
              sx={{ color: 'blue', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              onClick={toggleCollapseShowAddCollection}
            >
              add new one
            </Typography>
          </Box>
          <Collapse in={collapseShowAddCollection}>
            <Paper sx={{ p: 2 }}>
              <Box>
                <IconButton sx={{ float: 'right', m: '-8px -8px 0 0' }} onClick={toggleCollapseShowAddCollection}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box>
                Add Collection
              </Box>
              <Box sx={{ padding: '16px 0'}}>
                <TextField
                  value={collapseCollection?.name || ''}
                  onChange={e => setCollapseCollection({
                    ...collapseCollection,
                    name: e.target.value
                  })}
                  fullWidth
                  label="Collection Name"
                  variant="outlined"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => handleSubmitAddNew({
                    collection: collapseCollection,
                    callback: toggleCollapseShowAddCollection
                  })}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Collapse>
        </Box>
      );
    }
    return (
      <Box>Are you sure to delete this anime from collection?</Box>
    );
  }

  const isValidRequiredCollectionName = ({
    collection = dialogCollection,
    message = 'Collection name is required!'
  } = {}) => {
    const valid = collection?.name;
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message
      });
    }
    return valid;
  }

  const isValidUniqueCollectionName = ({
    collection = dialogCollection
  } = {}) => {
    const valid = !getCollections().find(e => e.name === collection?.name)
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Collection name should be unique!'
      });
    }
    return valid;
  }

  const isValidSpecialCHarsCollectionName = ({
    collection = dialogCollection
  } = {}) => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const valid = !format.test(collection?.name);
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

  const isValidRequiredAnimes = () => {
    const valid = animes?.length;
    if (!valid) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Please select some animes!'
      });
    }
    return valid;
  }

  const handleSubmitAddNew = ({
    collection = dialogCollection,
    callback = dialog.close
  } = {}) => {
    if (!isValidRequiredCollectionName({ collection })) return;
    if (!isValidUniqueCollectionName({ collection })) return;
    if (!isValidSpecialCHarsCollectionName({ collection })) return;
    addCollection(collection);
    callback();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes add new collection!'
    });
    onSuccess();
  };

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
    onSuccess();
  }

  const handleSubmitDelete = () => {
    deleteCollection(dialogCollection?.name);
    dialog.close();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes delete collection!'
    });
    onSuccess();
  };

  const handleSubmitAddAnimeToCollection = () => {
    if (!isValidRequiredCollectionName({ message: 'Please select one collection!' })) return;
    if (!isValidRequiredAnimes()) return;
    addAnimesToCollection(dialogCollection?.name, animes);
    dialog.close();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes add anime to collection!'
    });
  }

  const handleSubmitDeleteAnimeFromCollection = () => {
    deleteAnimeFromCollection(dialogCollection?.name, dialogAnime?.id);
    dialog.close();
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Succes delete anime from collection!'
    });
  }

  const handleSubmit = () => {
    if (dialog.type === "add") {
      handleSubmitAddNew();
    } else if (dialog.type === "edit") {
      handleSubmitEdit();
    } else if (dialog.type === "delete") {
      handleSubmitDelete();
    } else if (dialog.type === "addAnime") {
      handleSubmitAddAnimeToCollection();
    } else {
      handleSubmitDeleteAnimeFromCollection();
    }
  }

  return (
    <>
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
    </>
  )
}

export default CollectionDialog;