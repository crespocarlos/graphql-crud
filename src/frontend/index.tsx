import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './style/style.css'

const SongList = React.lazy(() =>
  import(/* webpackChunkName="song-list" */ './components/song-list')
)
const SongCreate = React.lazy(() =>
  import(/* webpackChunkName="song-create" */ './components/song-create')
)
const SongDetail = React.lazy(() =>
  import(/* webpackChunkName="song-detail" */ './components/song-detail')
)

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => object.id || null,
})

const client = new ApolloClient({ cache })

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
