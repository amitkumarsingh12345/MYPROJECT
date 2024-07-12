const mongodb = require('../db');
const admin = () => {
    try {
        const adminschema = new mongodb.Schema({
            name: String,
            password: String
        });
        const adminstructure = new mongodb.model('admin',adminschema);
        module.exports = adminstructure;
    } catch(error) {
        console.log("admit schema error: "+error);
    }
}
admin();
