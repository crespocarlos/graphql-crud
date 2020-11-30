import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import LyricCreate from './lyric-create'
import { useQuery } from '@apollo/react-hooks'
import LyricList from './lyric-list'
import gql from 'graphql-tag'

type SongDetailProp = RouteComponentProps<{ id: string }, {}>

const SongDetail: React.FC<SongDetailProp> = ({ ...props }) => {
  const id = props.match.params.id
  const { loading, data } = useQuery(FETCH_SONG, {
    variables: { id },
  })

  const { song } = data || {}
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

export const FETCH_SONG = gql`
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

export default SongDetail
