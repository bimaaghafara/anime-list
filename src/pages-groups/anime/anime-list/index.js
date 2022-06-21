// libs
import { useState } from 'react';
import { useRouter } from 'next/router';

// hooks
import usePagination from 'src/hooks/usePagination';

// components
import {
  Box,
  Typography,
  Pagination,
  PaginationItem,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { AnimeCard } from './components/anime-card';

// graphql
import { useAnimeListQuery } from './graphql/anime-list';

// styles
import sx from './styles';

export default function AnimeList() {
  const router = useRouter();
  const {
    page,
    setPage,
    perPage,
    handleChangePerPage,
  } = usePagination();
  const { data, isLoading, error } = useAnimeListQuery({ page, perPage });

  if ( error ) return <>Error!</>
  if ( isLoading || !data ) return <>Loading...</>

  const animeList = data?.Page?.media || [];
  const totalPage = data?.Page?.pageInfo?.total || 0;

  return (
    <Box sx={sx.root}>
      <Typography sx={sx.title}>Anime List</Typography>
      {animeList.map((anime) => 
        <Box key={anime.id} sx={sx.animeCard}>
          <AnimeCard
            key={anime.id}
            anime={anime}
            onClick={() => router.push(`/anime/${anime.id}`)}
          />
        </Box>
      )}
      <Box sx={sx.paginationContainer}>
        <FormControl size="small">
          <Select value={perPage} onChange={handleChangePerPage}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          page={page}
          count={Math.ceil((totalPage > 5000 ? 5000 : totalPage) / perPage)}
          onChange={(e, value) => setPage(value)}
          renderItem={(item) => <PaginationItem {...item} />}
        />
      </Box>
    </Box>
  )
}
