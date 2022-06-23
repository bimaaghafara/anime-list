import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { AnimeListSchema } from './schema';

export const getAnimeList = (variables) => request('https://graphql.anilist.co', AnimeListSchema, variables);

export const useAnimeListQuery = (
  variables,
  options
) => useQuery(
  ['animeList', variables],
  () => getAnimeList(variables),
  options
);