import { AuthenticationError } from "apollo-server-errors"

export default function AuthorizedResolver(callback) {
  return (parent, args, context, info) => {
    const {user} = context

    return !user
      ? new AuthenticationError('Hei! Are you lost?')
      : callback(parent, args, context, info)
  }
}