const mongoose = require('mongoose')
const express = require('express')
const { getState } = require('../controllers/states')
const { sendResponseValues } = require('../utility/helpers')
const router = express.Router()

router.get('/:state', function(req, res){
    getState(req).then(response => {
        console.log({response})
        sendResponseValues(res, response)
    }).catch(error => {
        sendResponseValues(res, {status: false, error: {}}, true)
    })
})

module.exports = router