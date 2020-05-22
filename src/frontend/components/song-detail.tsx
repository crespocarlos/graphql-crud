import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import fetchSong from '../queries/fetchSong'
import LyricCreate from './lyric-create'
import { useQuery } from '@apollo/react-hooks'
import LyricList from './lyric-list'

type SongDetailProp = RouteComponentProps<{ id: string }, {}>

const SongDetail: React.FC<SongDetailProp> = ({ ...props }) => {
  const id = parseInt(props.match.params.id, 10)
  const { loading, data } = useQuery(fetchSong, {
    variables: { id },
  })

  const { song } = data
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={id} />
    </div>
  )
}

export default SongDetail
