let mongoose = require("mongoose")

let placeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    state: {type: String, required: false},
    stateId: {type: mongoose.Types.ObjectId, required: true},
    thumbImage: {type: String, required: false},
    coordinates: {
        type: {
          type: String,
          enum: ['Point'], // 'Point' for GeoJSON
          required: true,
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
    },
    images: [{  
        type: String, // URL of the image
    }],
    tags: [{type: mongoose.Types.ObjectId}],
    // rating: ,
    // openingHours: ,
    // entryFee: ,
    // bestTimeToVisit: ,
    // videoUrl: ,
    // isFeatured: ,
})

placeSchema.index({ coordinates: '2dsphere' }); // Create a geospatial index

module.exports = mongoose.model('Place', placeSchema);