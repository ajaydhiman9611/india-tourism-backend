const constants = require('./constants')

exports.sendSuccess = ({res, data}) => {
    return res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        data: data,
    })
}

exports.sendError = function ({res, error_index, status_code, custom_message}) {
    console.trace(err)
    if (typeof status_code == 'undefined') {
      status_code = constants.HTTP_STATUS.SERVER_ERROR
    }
    return res.status(status_code).json({
      message: custom_message || constants.ERRORS[error_index],
      success: false,
    })
  }