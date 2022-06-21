import gql from 'graphql-tag';

export const AnimeDetailSchema = gql`
  query Media($id: Int) {
    Media(id: $id) {
      title {
        english
        native
      }
      description
      bannerImage
      coverImage {
        large
      }
      format
      episodes
      duration
      status
      startDate{
        year
        month
        day
      }
      endDate{
        year
        month
        day
      }
    }
  }
`;