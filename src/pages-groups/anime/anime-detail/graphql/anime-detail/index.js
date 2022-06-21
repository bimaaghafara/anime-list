import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { AnimeDetailSchema } from './schema';

export const useAnimeDetailQuery = (
  variables,
  options
) => useQuery(
  ['animeDetail', variables],
  () => request('https://graphql.anilist.co', AnimeDetailSchema, variables),
  options
);