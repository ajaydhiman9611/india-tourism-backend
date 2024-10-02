let {Schema} = require("mongoose")

let itinerarySchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    heroImage: {type: String, required: true},
    heroDescription: {type: String, required: true},
})

module.exports = mongoose.model('Itinerary', itinerarySchema);
