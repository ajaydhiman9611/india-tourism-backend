const mongoose = require('mongoose')
const configs = require('./configs.js')

var dbConnectionAttempts = 0

function connectMongoDB(poolSize = configs.MONGO_POOLSIZE) {
  var options = {
    // keepAlive: configs.MONGO_SERVER_KEEPALIVE,
    maxPoolSize: poolSize,
  }

//   console.log(
//     '==================    MONGODB CONNECTION ENVIRONMENT : ' +
//       process.env.NODE_ENV +
//       '=================='
//   )

  mongoose.connection.on('error', function (err) {
    console.log(err)
    console.trace('MongoDB Connection Error ' + err)
    if (dbConnectionAttempts == configs.DB_CONNECTION_RETTEMPT_LIMIT_NODE) {
     console.log("\n\n MAYDAY MAYDAY, Can't connect to the DB!\n\n")
    } else {
      dbConnectionAttempts++
      connectMongoDB()
    }
  })

  mongoose.connection.once('open', () => {
    console.log('Database Connection Open')
  })

  if (configs.MONGO_ATLAS_CONNECTION_STRING != '') {
    console.log('Going to connect to MongoDB Atlas')
    return mongoose.connect(configs.MONGO_ATLAS_CONNECTION_STRING, options)
  }

  if (process.env.NODE_ENV == 'test') {
    return mongoose.connect(
      'mongodb://' +
        configs.MONGO_HOST +
        ':' +
        configs.MONGO_PORT +
        '/' +
        configs.DB_NAME,
      options
    )
  }

  if (!configs.MONGO_UNAME || configs.MONGO_UNAME == '') {
    // console.log(
    //   '==================    NO MONGO_UNAME FOUND IN CONFIGS, WILL CONNNECT WITHOUT REPLICA OPTIONS=================='
    // )
    // console.log(
    //   '==================    MONGODB CONNECTION POOL_SIZE : ' + poolSize + '=================='
    // )
    console.log(
      'mongodb://' +
        configs.MONGO_HOST +
        ':' +
        configs.MONGO_PORT +
        '/' +
        configs.DB_NAME
    )
    return mongoose.connect(
      'mongodb://' +
        configs.MONGO_HOST +
        ':' +
        configs.MONGO_PORT +
        '/' +
        configs.DB_NAME,
      options
    )
  }

  if (configs.MONGO_REPLICA_SET_NAME != '') {
    options.replicaSet = configs.MONGO_REPLICA_SET_NAME
  }

  var connect_string =
    'mongodb://' + configs.MONGO_UNAME + ':' + configs.MONGO_PASS + '@'
  var mongo_hosts = configs.MONGO_HOST
  var mongo_port = configs.MONGO_PORT
  for (var i = 0; i < mongo_hosts.length; i++) {
    if (i > 0) connect_string += ','
    connect_string += mongo_hosts[i] + ':' + mongo_port
  }
  connect_string += '/' + configs.DB_NAME

  if (configs.MONGO_SSL) {
    options.tls = configs.MONGO_SSL
    options.tlsCAFile = configs.MONGO_SSL_CA_CERT_PATH
    options.retryWrites = configs.MONGO_RETRY_WRITES
  }

  console.log('Connect String : ' + connect_string)
  console.log('Connect Options')
  console.log(options)
  return mongoose.connect(connect_string, options)
}

module.exports = connectMongoDB
