import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, create, ReactTestRendererJSON } from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { FETCH_SONGS } from '../queries/songs'

// The component AND the query need to be exported
import SongList, { SongListResponse, DELETE_SONG } from './song-list'

// jest.mock('react-router-dom') // <- Use this line

const wait = (amount = 0, func: () => void) =>
  act(() => new Promise((resolve) => setTimeout(resolve, amount)).then(func))

const getMocks = (songs: SongListResponse['songs']) => [
  {
    request: {
      query: FETCH_SONGS,
    },
    result: {
      data: {
        songs,
      },
    },
  },
  {
    request: {
      query: DELETE_SONG,
      variables: { name: 'Buck' },
    },
    result: { data: songs },
  },
]

describe('<SongList />', () => {
  it('should render loading state initially', () => {
    const container = create(
      <MockedProvider mocks={getMocks([])}>
        <MemoryRouter>
          <SongList />
        </MemoryRouter>
      </MockedProvider>
    )

    const tree: ReactTestRendererJSON = container.toJSON() as any
    expect(tree?.children).toContain('Loading...')
  })

  it('renders without error', async () => {
    const wrapper = create(
      <MockedProvider
        mocks={getMocks([{ id: 1, title: 'lalala' }])}
        addTypename={false}
      >
        <MemoryRouter>
          <SongList />
        </MemoryRouter>
      </MockedProvider>
    )

    await wait(0, () => {
      const testInstance = wrapper.root

      expect(testInstance.findByType('ul').children.length).toEqual(1)
    })
  })
})
