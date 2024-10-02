
const express = require('express')
const app = express()
let configs = require('./utility/configs')
const connectMongoDB = require('./utility/connectDB')
const { get_states, get_all_states } = require('./controllers/serverController')
const { sendSuccess, sendError } = require('./utility/helpers')
const constants = require('./utility/constants')

app.get('/ping', (req, res) => {
  res.send('pong!')
})

app.use(function(req, res, next){
    console.log("\n\n In req.url :: ", req.url)
    next()
})

app.get('/api/v1/gt_al', function(req, res){
    get_all_states(req).then(response => {
        if(response.status){
            return sendSuccess({res, data: response.data})
        } else {
            return sendError({res, ...response.error})
        }
    }).catch(err => {
        return sendError({res, error_index: 'server_error', status_code: constants.HTTP_STATUS.SERVER_ERROR})
    })
})

app.get('/api/v1/gt_st', function(req, res){
    get_states(req).then(data => {
        return sendSuccess({res, data})
    }).catch(err => {
        return sendError({res, error_index: 'server_error', status_code: constants.HTTP_STATUS.SERVER_ERROR})
    })
})

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
})

app.listen(configs.PORT, () => {
    connectMongoDB()
    console.log(`LISTENING ON ${configs.PORT}`)
})