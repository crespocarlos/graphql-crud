/* eslint-disable no-console */
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../../config/webpack.config'
import schema from './schema/schema'

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

app.use(webpackMiddleware(webpack(webpackConfig)))

server.applyMiddleware({ app })

export { app, server }
