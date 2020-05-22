import { createTestClient } from 'apollo-server-testing'
import schema from './schema'
import { ApolloServer, gql } from 'apollo-server-express'

jest.mock('../models/song', () => ({
  findLyrics: jest.fn(() => [{ id: 2, content: 'bla', likes: 10 }]),
  findById: jest.fn(() => ({ id: 1, title: 'testById' })),
}))

const GET_SONG = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`

describe('SongType', () => {
  it('fetches single song', async () => {
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const server = new ApolloServer({
      schema,
    })

    // use the test server to create a query function
    const { query } = createTestClient(server)

    // run query against the server and snapshot the output
    const res = await query({ query: GET_SONG, variables: { id: 1 } })
    expect(res).toMatchSnapshot()
  })
})
