let mongoose = require("mongoose")

let stateSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    desc: {type: String, required: true},
    heroImage: {type: String, required: false},
    heroDescription: {type: String, required: false},
})

module.exports = mongoose.model('State', stateSchema);