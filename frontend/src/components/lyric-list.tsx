import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

type LyricListPayload = {
  __typename: string
  likeLyric: {
    id: number
    __typename: string
    likes: number
  }
}

interface LyricListVariable {
  id: number
}

type LyricListProps = {
  lyrics: Array<{
    id: number
    content: string
    likes: number
  }>
}

const LyricList: React.FC<LyricListProps> = ({ lyrics }) => {
  const [likeLyrics] = useMutation<LyricListPayload, LyricListVariable>(
    LIKE_LYRICS
  )
  function onLike(id: number, likes: number) {
    likeLyrics({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    })
  }

  function renderLyrics() {
    return lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ))
  }

  return <ul className="collection">{renderLyrics()}</ul>
}

const LIKE_LYRICS = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default LyricList
