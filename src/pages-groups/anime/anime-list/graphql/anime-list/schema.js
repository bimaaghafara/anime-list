import gql from 'graphql-tag';

export const AnimeListSchema = gql`
  query Page(
    $page: Int
    $perPage: Int
  ){
    Page(
      page: $page
      perPage: $perPage
    ){
      media(
        type: ANIME
      ) {
        title {
          english
          native
        }
        id
        bannerImage
        description
      }
    }
  }
`;