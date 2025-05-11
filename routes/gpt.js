const mongoose = require('mongoose')
const express = require('express')
const { getState } = require('../controllers/states')
const { sendResponseValues, rateLimitMiddleware } = require('../utility/helpers')
const router = express.Router()
const { handlePrompt } = require('../controllers/gpt')

router.post('/test', rateLimitMiddleware, function(req, res){
    handlePrompt(req).then(response => {
        console.log({response})
        sendResponseValues(res, response)
    }).catch(error => {
        sendResponseValues(res, {status: false, error}, true)
    })
})

module.exports = router