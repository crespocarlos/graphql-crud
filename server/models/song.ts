import mongoose, { Schema, Document, Model } from 'mongoose'
import { ILyricModel } from './lyric'

export interface ISongModel extends Document {
  user: any
  lyrics: Array<ILyricModel>
  title: string
}

interface ISong extends Model<ISongModel> {
  addLyric(id: number, content: string): ISongModel
  findLyrics(id: number): ILyricModel
}

const SongSchema: Schema = new mongoose.Schema({
  title: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lyric'
    }
  ]
})

SongSchema.statics.addLyric = function(id: number, content: string) {
  const Lyric = mongoose.model<ILyricModel>('lyric')

  return this.findById(id).then((song: ISongModel) => {
    const lyric = new Lyric({ content, song: song.id })
    song.lyrics = song.lyrics.concat([lyric])
    return Promise.all([lyric.save(), song.save()]).then(([_, song]) => song)
  })
}

SongSchema.statics.findLyrics = function(id: number) {
  return this.findById(id)
    .populate('lyrics')
    .then((song: ISongModel) => song.lyrics)
}

const Song: ISong = mongoose.model<ISongModel, ISong>('song', SongSchema)

export default Song
