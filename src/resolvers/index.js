import queryResolvers from './queries/index'
import mutationResolvers from './mutations/index'

export default {
  Query: {
    ...queryResolvers.reduce((acc, resolver) => {
      return {
        ...acc, 
        ...require(`./queries/${resolver}`).default
      }
    }, {})
  },
  Mutation: {
    ...mutationResolvers.reduce((acc, resolver) => {
      return {
        ...acc, 
        ...require(`./mutations/${resolver}`).default
      }
    }, {})
  }
}