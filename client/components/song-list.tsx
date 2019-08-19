import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import { useMutation, useQuery } from '@apollo/react-hooks'
import fetchSongs from '../queries/fetchSongs'

type SongListVariable = {
  id: number
}

type SongListResponse = {
  songs: Array<{
    id: number
    title: string
  }>
}
const SongList = () => {
  const [deleteSong] = useMutation<SongListResponse, SongListVariable>(
    DELETE_SONG,
    {
      refetchQueries: [{ query: fetchSongs }]
    }
  )
  const { loading, data } = useQuery<SongListResponse, SongListVariable>(
    fetchSongs,
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

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default SongList
