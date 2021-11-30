import express from 'express'
import mongoose from 'mongoose'
import User from '@/models/User'
import { ApolloServer } from 'apollo-server-express'
import {RateLimiterMongo} from 'rate-limiter-flexible'
import expressJWT from 'express-jwt'

// data sources
import CountryAPI from '@/datasources/CountryAPI'
import ExchangeAPI from '@/datasources/ExchangeAPI'
//
import typeDefs from '@/type-defs/index'
import resolvers from  '@/resolvers/index'
//
const {
  Types: {
    ObjectId
  }
} = require('mongoose')
//
mongoose.connect('mongodb://localhost:27017/anyfin')
//
const app = express()

app.use(async (req, res, next) => {
  const rateLimiter = new RateLimiterMongo({
    storeClient: mongoose.connection,
    keyPrefix: 'middleware',
    points: 100, // 100 requests
    duration: 5, // per 5 second by IP
  })
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch(e) {
    console.log('rejecting')
    res.status(429).send('Too Many Requests');
  }
})

app.use(expressJWT({
  secret: '_REPLACE_THIS_',
  credentialsRequired: false,
  algorithms: ["HS256"]
}))

const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => ({
    countryAPI: new CountryAPI(),
    exchangeAPI: new ExchangeAPI()
  }),
  context: async ({ req }) => {
    const {
      user: {
        id,
        access_key
      } = {}
    } = req
    const user = await User.findOne({_id: ObjectId(id), access_key})
    return user
      ? { user }
      : {}
  }
})
apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app })
  app.listen({ port: 4000 }, () => {
    console.log(`http://localhost:4000${apolloServer.graphqlPath}`)
  })
})