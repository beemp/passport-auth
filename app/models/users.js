const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

// =====================================
// Schema ==============================
// =====================================
let userSchema = mongoose.Schema({
  local           : {
    email         : String,
    password      : String
  },
  facebook        : {
    id            : String,
    token         : String,
    email         : String,
    name          : String
  },
  twitter         : {
    id            : String,
    token         : String,
    displayName   : String,
    username      : String
  },
  google          : {
    id            : String,
    token         : String,
    email         : String,
    name          : String
  }
})

// =====================================
// PASSWORDS ===========================
// =====================================
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null) //8 rounds in Feistel
}
userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
