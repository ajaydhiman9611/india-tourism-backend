var fs = require('fs')
var configs = {
    CONFIGS_OVERWRITE_FILE: "configs_overwrite.js",
    PORT: 3000,
    DB_NAME: "india-tourism",
    MONGO_POOLSIZE: 5,
    MONGO_ATLAS_CONNECTION_STRING: "",
    MONGO_HOST: process.env.MONGO_HOST ? process.env.MONGO_HOST : ['127.0.0.1'],
    MONGO_PORT: '27017',
    MONGO_REPLICA_SET_NAME: 'rs2',
    MONGO_UNAME: process.env.MONGO_UNAME ? process.env.MONGO_UNAME : '', 
    MONGO_PASS: process.env.MONGO_PASS ? process.env.MONGO_PASS : '', 
}
var overwriteConfigFulFileName =
  __dirname + '/' + configs.CONFIGS_OVERWRITE_FILE
if (fs.existsSync(overwriteConfigFulFileName)) {
  var overwriteConfig = require(overwriteConfigFulFileName)
  for (var key in overwriteConfig) {
    // console.log(configs[key], configs[key]?.constructor === Object)
    for (let key of Object.keys(configs)) {
      if (
        configs[key]?.constructor === Object &&
        overwriteConfig[key]?.constructor === Object
      ) {
        configs[key] = { ...configs[key], ...overwriteConfig[key] }
      } else if (key in overwriteConfig) {
        configs[key] = overwriteConfig[key]
      }
    }
    if (!(key in configs)) {
      configs[key] = overwriteConfig[key]
    }
  }
} else {
  console.log(
    '======== No Overwrite Configs File Found to overwrite any config key ========'
  )
}

module.exports = configs