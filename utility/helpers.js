const constants = require('./constants')

exports.sendSuccess = ({res, data}) => {
    return res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        data: data,
    })
}

exports.sendError = function ({res, error_index, status_code, custom_message}) {
    if (typeof status_code == 'undefined') {
      status_code = constants.HTTP_STATUS.SERVER_ERROR
    }
    return res.status(status_code).json({
      message: custom_message || constants.ERRORS[error_index],
      success: false,
    })
  }

exports.initiateResponseValues = function(req){
  console.log("\n\n\n In req.url : ", req.url, " with :: ", {reqQuery: req.query, reqBody: req.body, reqParams: req.params})
  let status = true, data = {}, error = []
  return { status, data, error: {error_index: "", status_code: undefined, custom_message: ""} }
}

exports.sendResponseValues = function(res, {status, data, error}, ifError = false){
  if(status){
    return exports.sendSuccess({res, data})
  } else {
    if(ifError){
      return exports.sendError({res, error_index: 'server_error'})
    } else {
      return exports.sendError({res, error_index: 'server_error'})
    }
  }
}