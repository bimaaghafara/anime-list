// components
import { Box } from "@mui/material";

// hooks
import useCollection from "src/hooks/useCollection";

const CollectionList = () => {
  const {
    getCollections,
    // setCollections,
    // getCollectionBy,
    // setCollection,
    // isValidName
  } = useCollection();
  return (
    <Box>
      {getCollections().map(collection => (
        <Box key={collection.name}>{collection.name}</Box>
      ))}
    </Box>
  )
}

export default CollectionList;