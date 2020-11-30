/* eslint-disable no-console */
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import schema from './schema/schema'

const PORT = 4000
const app = express()

const server = new ApolloServer({ schema })

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://ccrespo:secret@mongo:27017/lyricaldb'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error))

app.use(bodyParser.json())

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: true,
  },
  path: '/',
})

app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
})

export { app, server }
