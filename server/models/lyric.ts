import mongoose, { Schema, Document, Model } from 'mongoose'
import { ISongModel } from './song'

export interface ILyricModel extends Document {
  song: ISongModel
  likes: number
  content: string
}

interface ILyric extends Model<ILyricModel> {
  like(id: number): ILyricModel | null
}

const LyricSchema: Schema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
})

LyricSchema.statics.like = function(id: number) {
  const Lyric = mongoose.model<ILyricModel>('lyric')

  return Lyric.findById(id).then((lyric: ILyricModel | null) => {
    if (!lyric) return lyric as unknown

    ++lyric.likes
    return lyric.save()
  })
}

const Lyric: ILyric = mongoose.model<ILyricModel, ILyric>('lyric', LyricSchema)

export default Lyric
