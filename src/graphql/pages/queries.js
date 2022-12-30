import {gql} from "@apollo/client";

export const GET_LANDING = gql`
query GET_LANDING {
  landingPage {
    data {
      attributes {
        Title
        Description
        Cover {
          data {
            attributes {
              url
              caption
            }
          }
        }
        certifications {
          data {
            attributes {
              Name
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
        posts {
          data {
            id
            attributes {
              Title
              Description
              publishedAt
            }
          }
        }
        resume {
          data {
            id
            attributes {
              Company
              Title
              Start
              End
              icon {
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
    }
  }
}
`

export const GET_ARTICLES = gql`
query GET_ARTICLES {
  articlesPage {
    data {
      attributes {
        Title
        Description
        posts {
          data {
            id
            attributes {
              Title
              Description
              publishedAt
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PROJECTS = gql`
query GET_PROJECTS {
  projectsPage {
    data {
      id
      attributes {
        Title
        Description
        projects {
          data {
            id
            attributes {
              Title
              Description
              Url
              Image {
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
    }
  }
}
`

export const GET_ABOUT = gql`
query GET_ABOUT {
  aboutPage {
    data {
      id
      attributes {
        Title
        linkedin
        instagram
        github
        email
        Content
      }
    }
  }
}
`