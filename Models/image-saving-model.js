const mongo = require('mongoose'),
    schema = mongo.Schema
;

const imageFile = new schema({
    _id:schema.Types.ObjectId,
    imageBinary:Buffer,
    contentType:String
});

module.exports = mongo.model('images',imageFile);
