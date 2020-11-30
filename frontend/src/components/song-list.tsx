import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

type SongListVariable = {
  id: number
}

export type SongListResponse = {
  songs: Array<{
    id: number
    title: string
  }>
}
const SongList = () => {
  const [deleteSong] = useMutation<SongListResponse, SongListVariable>(
    DELETE_SONG,
    {
      refetchQueries: [{ query: FETCH_SONGS }],
    }
  )
  const { loading, data } = useQuery<SongListResponse, SongListVariable>(
    FETCH_SONGS,
    { notifyOnNetworkStatusChange: true }
  )

  function onSongDelete(id: number) {
    deleteSong({ variables: { id } })
  }

  function renderSongs() {
    if (!data || data.songs.length === 0) return <li></li>

    return data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => onSongDelete(id)}>
            delete
          </i>
        </li>
      )
    })
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  )
}

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export const FETCH_SONGS = gql`
  {
    songs {
      id
      title
    }
  }
`

export default SongList
