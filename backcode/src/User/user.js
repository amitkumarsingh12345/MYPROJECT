const db = require('../db');

module.exports = new db.model('user', {
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    length: 6,
  },
  confirmpassword: {
    type: String,
    length: 6,
  },
  phone: String,
  Date: {
    type: String,
    default: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}
${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  }
})


