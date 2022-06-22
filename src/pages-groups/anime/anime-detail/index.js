// libs
import { useRouter } from 'next/router';
import { useState } from 'react';

// components
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button
} from '@mui/material';
import CollectionDialog from 'src/components/collection-dialog';
import AddIcon from '@mui/icons-material/Add';

// hooks
import useDialog from "src/hooks/useDialog";

// styles
import sx from './styles';

// graphql
import { useAnimeDetailQuery } from './graphql/anime-detail';

const AnimeDetail = () => {
  const router = useRouter();
  const dialog = useDialog();
  const [prevDialogCollectionName, setPrevDialogCollectionName] = useState();
  const [dialogCollection, setDialogCollection] = useState();
  const { data, isLoading, error } = useAnimeDetailQuery(
    { id: Number(router?.query?.id || 0) },
    { enabled: router?.isReady }
  );

  if ( error ) return <div className='loader'>Error!</div>;
  if ( isLoading || !data ) return <div className='loader'>Loading . . .</div>;

  const anime = data?.Media;

  const leftDetails = [
    { value: anime?.format, text: anime?.format, label: 'Format' },
    { value: anime?.episodes, text: anime?.episodes, label: 'Episodes' },
    { value: anime?.duration, text: `${anime?.duration} mins`, label: 'Duration' },
    { value: anime?.status, text: anime?.status, label: 'Status' },
    {
      value: [anime?.startDate?.year, anime?.startDate?.month, anime?.startDate?.day].join(''),
      text: [anime?.startDate?.year, anime?.startDate?.month, anime?.startDate?.day].join(' - '),
      label: 'Start Date'
    },
    {
      value: [anime?.endDate?.year, anime?.endDate?.month, anime?.endDate?.day].join(''),
      text: [anime?.endDate?.year, anime?.endDate?.month, anime?.endDate?.day].join(' - '),
      label: 'End Date'
    },
    { value: anime?.averageScore, text: `${anime?.averageScore}%`, label: 'Average Score' },
    { value: anime?.meanScore, text: `${anime?.meanScore}%`, label: 'Mean Score' },
    { value: anime?.popularity, text: anime?.popularity.toLocaleString('en-US'), label: 'Popularity' },
    { value: anime?.favourites, text: anime?.favourites.toLocaleString('en-US'), label: 'Favourites' },
  ];

  const characters = anime?.characters?.edges?.map(char => ({
    name: char?.node?.name?.full,
    role: char?.role,
    image: char?.node?.image?.medium
  }));

  const handleOpenAddAnimeToCollection = () => {
    dialog.setTitle('Add Anime to Collection');
    dialog.open();
    dialog.setType("addAnime");
  }

  return (
    <Box sx={sx.root}>
      <Box sx={sx.bannerImage} component="img" src={anime?.bannerImage} />
      <Box sx={sx.content}>
        <Box sx={sx.headerContainer}>
          <Box sx={sx.addToCollection}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddAnimeToCollection}
            >
              Collection
            </Button>
          </Box>
          <Box sx={sx.headerImage} component="img" src={anime?.coverImage?.large} />
          <Box sx={sx.headerRight}>
            <Box sx={sx.titleContainer}>
              <Typography>{anime?.title?.english}</Typography>
              <Typography>{anime?.title?.native}</Typography>
            </Box>
            <Box sx={sx.description} dangerouslySetInnerHTML={{ __html: anime?.description }} />
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper sx={{ p: 2 }}>
              {leftDetails.filter(e => !!e.value).map((e, i) => (
                <Box sx={sx.leftDetail} key={i}>
                  <Box>{e.label}</Box>
                  <Box sx={sx.leftDetailsText}>{e.text}</Box>
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Paper sx={{ p: 2 }}>
              <Typography sx={sx.charactersTitle}>Characters</Typography>
              {!characters?.length && <Typography sx={sx.noCharacters}>Not available.</Typography>}
              <Box>
                {characters.map(char => (
                  <Box key={char.name} sx={sx.characterContainer}>
                    <Box sx={sx.characterIamge(char.image)} />
                    <Box sx={sx.characterName}>{char.name}</Box>
                    <Box sx={sx.characterRole}>{char.role}</Box>
                  </Box>  
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <CollectionDialog
        dialog={dialog}
        dialogCollection={dialogCollection}
        setDialogCollection={setDialogCollection}
        prevDialogCollectionName={prevDialogCollectionName}
      />
    </Box>
  )
}

export default AnimeDetail;