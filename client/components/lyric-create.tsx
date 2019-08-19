import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

type LyricCreatePayload = {
  songId: number
  content: string
}

type LyricCreateVariable = {
  songId: number
  content: string
}

type LyricCreateProps = {
  songId: number
}

const LyricCreate: React.FC<LyricCreateProps> = ({ songId }) => {
  const [content, setContent] = useState('')
  const [addLyricsToSong] = useMutation<
    LyricCreatePayload,
    LyricCreateVariable
  >(ADD_LYRIC_TO_SONG)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    addLyricsToSong({
      variables: {
        content,
        songId
      }
    }).then(() => setContent(''))
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        value={content}
        onChange={event => setContent(event.target.value)}
      />
    </form>
  )
}

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default LyricCreate
