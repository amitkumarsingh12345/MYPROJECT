const mongoose = require('mongoose');
const createdb = () => {
   try {
      mongoose.connect('mongodb://localhost:27017/testdb');
      console.log("Connectiuon Success!!");
   } catch(error) {
      console.log(`Connection Error: ${error}`);
   } 
}
createdb();
module.exports = mongoose;