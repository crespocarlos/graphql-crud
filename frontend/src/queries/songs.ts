import gql from 'graphql-tag'

export const FETCH_SONGS = gql`
  {
    songs {
      id
      title
    }
  }
`
