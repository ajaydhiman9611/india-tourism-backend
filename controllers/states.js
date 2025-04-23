const { default: mongoose } = require('mongoose')
const { initiateResponseValues } = require('../utility/helpers')

require('../models/states')
require('../models/places')
const State = mongoose.model('State')
const Place = mongoose.model('Place')

exports.getState = async function(req){
    let { status, data, error } = initiateResponseValues(req)
    try{
        let state = await State.findOne({name: req.params.state}).lean()    
        console.log({state})

        let places = await Place.find({stateId: state._id}).lean()
        data = {...state, places}
        status = true
    } catch (err){
        console.log(" === this is it :: ", err)
    } finally {
        return {
            status,
            data,
            error
        }
    }
}