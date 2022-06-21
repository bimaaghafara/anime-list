import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { AnimeListSchema } from './schema';

export const useAnimeListQuery = (
  variables,
  options
) => useQuery(
  ['animeList', variables],
  () => request('https://graphql.anilist.co', AnimeListSchema, variables),
  options
);