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
    }
  }
`;