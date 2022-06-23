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
      pageInfo{
        total
      }
      media(
        type: ANIME
      ) {
        id
        title {
          english
          native
        }
        description
        bannerImage
        coverImage {
          large
        }
      }
    }
  }
`;