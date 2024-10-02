let {Schema, Types} = require("mongoose")

let tagsSchema = new Schema({
    name: {type: String, required: true},
})

module.exports = mongoose.model('Tag', tagsSchema);