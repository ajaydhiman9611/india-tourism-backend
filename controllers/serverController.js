const mongoose = require('mongoose')

require("../models/states")
const State = mongoose.model('State')

exports.get_all_states = async function (req){
    console.log("requestBody : ", req.body)
    try{
        let states = await State.find({})  
        console.log({states})
        return {
            status: true,
            data: states
        }
    } catch (err){
        return {
            status: false,
            error_index: 'server_error', 
            status_code: constants.HTTP_STATUS.SERVER_ERROR
        }
    }
}

exports.get_states = async function(req){
    console.log("requestBody : ", req.body)
    try{
        let states = await State.findOne({name: ""}).lean()    
        console.log({states})    
    } catch (err){
        console.log(" === this is it :: ", err)
    }
}


