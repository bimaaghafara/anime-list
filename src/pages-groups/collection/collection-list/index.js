// libs
import { useRouter } from "next/router";

// components
import { Box, Typography } from "@mui/material";

// hooks
import useCollection from "src/hooks/useCollection";

// styles
import sx from './styles';

const CollectionList = () => {
  const router = useRouter();
  const {
    getCollections,
    // setCollections,
    // getCollectionByName,
    // setCollection,
    // isValidName
  } = useCollection();

  return (
    <Box sx={sx.content}>
      <Typography variant="h5" sx={{ mb: '16px' }}>Collections</Typography>
      {getCollections().map(collection => (
        <Box key={collection.name}>
          <Typography
            variant="h6"
            sx={sx.collectionName}
            onClick={() => router.push(`/collection/${collection.name}`)}
          >
            {collection.name}
          </Typography>
          {!(collection?.animes?.length) && <Box sx={sx.collectionName}>-</Box>}
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
    </Box>
  )
}

export default CollectionList;