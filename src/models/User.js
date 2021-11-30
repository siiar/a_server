import timestamps from 'mongoose-timestamp'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
const {
  model,
  Schema
} = require('mongoose')

const schema = new Schema({
  access_key: {
    type: String
  },
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    require: true
  }
}).pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err)
      return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) 
        return next(err)
      // override the cleartext password with the hashed one
      this.password = hash
      this.access_key = crypto.randomUUID()
      next()
    })
  })
})

schema.plugin(timestamps)

schema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password,this.password)
}

export default model('User', schema)