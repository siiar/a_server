import { gql } from 'apollo-server-express'
const typeDefs = [
  'Auth',
  'Country',
  'Currency',
  'Exchange',
  'User',

  // The "Query" type is special: lists all available queries
  // that clients can execute
  'Query',
  // The "Mutation" type is special: lists all available mutations
  // that clients can execute
  'Mutation'
].map((schema) => require(`@/type-defs/${schema}`).default + "\r\n").join('')

export default gql`${typeDefs}`