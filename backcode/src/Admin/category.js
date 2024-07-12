const db = require('../db');
module.exports = new db.model('category',{
     name: {
      type: String,
      unique: true
     },
     discription: String
   }
)