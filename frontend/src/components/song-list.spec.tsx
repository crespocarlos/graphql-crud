import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { act, create } from 'react-test-renderer'

// The component AND the query need to be exported
import fetchSongs from '../queries/fetchSongs'
import SongList, { SongListResponse } from './song-list'

jest.mock('react-router-dom') // <- Use this line

const wait = (amount = 0, func: () => void) =>
  act(() => new Promise((resolve) => setTimeout(resolve, amount)).then(func))

const getMocks = (songs: SongListResponse['songs']) => [
  {
    request: {
      query: fetchSongs,
    },
    result: {
      data: {
        songs,
      },
    },
  },
]

describe('<SongList />', () => {
  it('should render loading state initially', () => {
    const container = create(
      <MockedProvider mocks={getMocks([])}>
        <SongList />
      </MockedProvider>
    )

    expect(container.toJSON()?.children).toContain('Loading...')
  })

  it('renders without error', async () => {
    const wrapper = create(
      <MockedProvider
        mocks={getMocks([{ id: 1, title: 'lalala' }])}
        addTypename={false}
      >
        <SongList />
      </MockedProvider>
    )

    await wait(0, () => {
      const testInstance = wrapper.root

      expect(testInstance.findByType('ul').children.length).toEqual(1)
    })
  })
})
