import {UserInputError} from 'apollo-server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'

export default {
  login: async (parent, args, context, info) => {
    const {
      username,
      password
    } = args
    
    try {
      const user = await User.findOne({username})
      //
      if(!user) 
        return new UserInputError('invalid username')
      //
      if(! (await user.isValidPassword(password)))
        return new UserInputError('invalid password')
      //
      const {
        _id,
        name,
        access_key
      } = user
      const token = jwt.sign({id: _id.toString(), access_key}, '_REPLACE_THIS_', {algorithm: 'HS256'})
      return {
        user: {
          id: _id.toString(),
          name
        },
        token
      }
    } catch (e) {
      throw new UserInputError('failed to login')
    }

    
  }
}