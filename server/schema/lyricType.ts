import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql'
import { Lyric, ILyricModel } from '../models'
import songType from './songType'

const LyricType: GraphQLObjectType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: songType,
      resolve(parentValue) {
        return Lyric.findById(parentValue)
          .populate('song')
          .then((lyric: ILyricModel | null) => {
            return lyric ? lyric.song : null
          })
      }
    }
  })
})

export default LyricType
