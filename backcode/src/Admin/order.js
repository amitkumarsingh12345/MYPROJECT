const db = require('../db');
module.exports = new db.model('order',{
     name: String,
     price: Number,
     category: String,
     useremail: String,
     qty: Number,
     image: String,
     date: {
        type: String,
        default: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
     },
     time: {
      type: String,
      default: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
   }
   }
)


