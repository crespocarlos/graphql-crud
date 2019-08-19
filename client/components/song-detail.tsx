import React from 'react'
import { Link, RouteComponentProps } from 'react-router'
import fetchSong from '../queries/fetchSong'
import LyricCreate from './lyric-create'
import { useQuery } from '@apollo/react-hooks'
import LyricList from './lyric-list'

type SongDetailProp = RouteComponentProps<{ id: number }, {}>

const SongDetail: React.FC<SongDetailProp> = ({ ...props }) => {
  const { loading, data } = useQuery(fetchSong, {
    variables: { id: props.params.id }
  })

  const { song } = data
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={props.params.id} />
    </div>
  )
}

export default SongDetail
