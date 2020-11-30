import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css'

const SongList = React.lazy(() => import('./components/song-list'))
const SongCreate = React.lazy(() => import('./components/song-create'))
const SongDetail = React.lazy(() => import('./components/song-detail'))

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => object.id || null,
})

const client = new ApolloClient({
  uri: '/graphql',
  cache,
  credentials: 'include',
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={SongList} />
            <Route path="/songs/new" component={SongCreate} />
            <Route path="/songs/:id" component={SongDetail} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
