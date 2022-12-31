export const GET_HEADER = gql`
query GET_HEADER {
  header {
    data {
      attributes {
        Logo {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;