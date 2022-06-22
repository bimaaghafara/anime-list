// libs
import { useRouter } from "next/router";

// components
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// hooks
import useCollection from "src/hooks/useCollection";
import useDialog from "src/hooks/useDialog";

// styles
import sx from './styles';

const CollectionList = () => {
  const router = useRouter();
  const dialog = useDialog();
  const {
    getCollections,
    // setCollections,
    // getCollectionByName,
    // setCollection,
    // isValidName
  } = useCollection();

  const handleOpenAddNew = () => {
    dialog.setTitle('Add New Collection');
    dialog.open();
  }

  const handleOpenEdit = () => {
    dialog.setTitle('Edit Collection');
    dialog.open();
  }

  const handleOpenDelete = () => {
    dialog.setTitle('Delete Collection');
    dialog.open();
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
          <IconButton sx={sx.addNew} onClick={handleOpenDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton sx={sx.addNew} onClick={handleOpenEdit}>
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
        <DialogContent>
          <Box>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={dialog.close}>
            Cancel
          </Button>
          <Button variant="contained" onClick={dialog.close} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CollectionList;