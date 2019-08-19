import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'
import SongType from './songType'
import LyricType from './lyricType'
import { Song, Lyric } from '../models'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(_, { title }) {
        return new Song({ title }).save()
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(_, { content, songId }) {
        return Song.addLyric(songId, content)
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Lyric.like(id)
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Song.remove({ _id: id })
      }
    }
  }
})

export default mutation
