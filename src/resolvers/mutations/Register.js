import { UserInputError } from 'apollo-server'
import User from '@/models/User'

export default {
  register: async (parent, args, context, info) => {
    try {
      const {
        name,
        username,
        password
      } = args
      // check if user already exists
      const exists = await User.findOne({username})
      if(exists) {
        throw new UserInputError('username already exists')
      }
      const user = await User.create({
        name,
        username,
        password
      })
      return {
        id: user._id,
        name: user.name
      }
    } catch(e) {
      throw new UserInputError(e)
    }
  }
}