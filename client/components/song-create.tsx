import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'
import { useMutation } from '@apollo/react-hooks'

type SongCreatePayload = {
  content: string
}

type SongCreateVariable = {
  title: string
}

const SongCreate = () => {
  const [title, setTitle] = useState('')
  const [addSong] = useMutation<SongCreatePayload, SongCreateVariable>(ADD_SONG)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    addSong({
      variables: { title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input onChange={event => setTitle(event.target.value)} value={title} />
      </form>
    </div>
  )
}

const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default SongCreate
