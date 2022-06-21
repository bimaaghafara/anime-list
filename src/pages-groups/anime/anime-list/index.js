import { useAnimeListQuery } from 'src/graphql/anime-list';

export default function AnimeList() {
  const { data, isLoading } = useAnimeListQuery({
    page: 1,
    perPage: 9
  });
  console.log({ isLoading, data });

  return (
    <div>
      Anime List!
    </div>
  )
}
