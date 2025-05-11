const constants = require('./constants')
var redis               = require('redis');
var configs				      = require('./../utility/configs.js');

const redis_client        = redis.createClient(configs.REDIS_PORT,configs.REDIS_HOST);
redis_client.select(configs.REDIS_CHAT_DB, function() { /* ... */ });

redis_client.on("error", function (err) {
    console.log("Error " + err);
});

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

// exports.rateLimitMiddleware = function(req, res, next) {
//   console.log(`\n\n\n In rateLimitMiddleware :::: Request URL: ${req.url} from IP: ${req.ip}`)
//   redis_client.get(`gpt_${req.url}__${req.ip}`, function (err, reply) {
//     if (err) {
//       console.error(err)
//       return res.status(constants.HTTP_STATUS.SERVER_ERROR).json({ success: false, error: 'Internal Server Error' })
//     }

//     if (reply > configs.GPT_API_RATE_LIMIT_PER_MINUTE) {
//       return res.status(constants.HTTP_STATUS.TOO_MANY_REQUESTS).json({ success: false, error: 'Too Many Requests' })
//     }

//     next()
//   })
//   next()
// }



exports.rateLimitMiddleware = async function(req, res, next) {
  // Ensure `trust proxy` is set in your app if behind a reverse proxy
  // e.g., app.set('trust proxy', 1); for req.ip to be accurate.
  const clientIp = req.ip;
  const requestUrl = req.url;

  const normalizedUrl = requestUrl;

  const keyPrefix = 'rate_limit_gpt'; // Consistent prefix for these keys
  const currentMinuteTimestamp = Math.floor(Date.now() / (60 * 1000));
  const redisKey = `${keyPrefix}__${normalizedUrl}__${clientIp}__${currentMinuteTimestamp}`;

  console.log(`\n[Rate Limiter] Request to URL: ${normalizedUrl} from IP: ${clientIp}. Key: ${redisKey}`);

  try {
    redis_client.incr(redisKey, (err, currentCount) => {
      if (err) {
        console.error('[Rate Limiter] Redis INCR error:', err);
        return res.status(constants.HTTP_STATUS.SERVER_ERROR).json({ success: false, error: 'Internal Server Error (Redis)' });
      }

      console.log(`[Rate Limiter] Current count for ${redisKey}: ${currentCount}`);

      if (currentCount === 1) {
        const expirySeconds = configs.GPT_API_RATE_LIMIT_DURATION
        redis_client.expire(redisKey, expirySeconds, (expireErr) => {
          if (expireErr) {
            console.error(`[Rate Limiter] Redis EXPIRE error for key ${redisKey}:`, expireErr);
            // Log the error but don't necessarily block the request for this.
            // The rate limiting will still work, but old keys might persist longer if EXPIRE fails.
          } else {
            console.log(`[Rate Limiter] Key ${redisKey} set to expire in ${expirySeconds} seconds.`);
          }
        });
      }

      // --- Step 3: Check if the current count exceeds the limit ---
      if (currentCount > configs.GPT_API_RATE_LIMIT) {
        console.warn(`[Rate Limiter] Rate limit exceeded for IP: ${clientIp} on URL: ${normalizedUrl}. Count: ${currentCount}`);
        // Optionally, you can add headers to inform the client about the rate limit
        res.setHeader('X-RateLimit-Limit', configs.GPT_API_RATE_LIMIT);
        res.setHeader('X-RateLimit-Remaining', 0);
        // To calculate X-RateLimit-Reset, you'd need the TTL of the key
        // redis_client.ttl(redisKey, (ttlErr, ttl) => { ... res.setHeader('X-RateLimit-Reset', Math.ceil(Date.now() / 1000) + ttl); });
        return res.status(constants.HTTP_STATUS.TOO_MANY_REQUESTS).json({ success: false, error: 'Too Many Requests' });
      }

      // --- If not exceeded, allow the request ---
      // Optionally set headers for remaining requests
      res.setHeader('X-RateLimit-Limit', configs.GPT_API_RATE_LIMIT);
      res.setHeader('X-RateLimit-Remaining', configs.GPT_API_RATE_LIMIT - currentCount);

      console.log(`[Rate Limiter] Request allowed for IP: ${clientIp} on URL: ${normalizedUrl}.`);
      next();
    });

  } catch (error) { // Catch any unexpected synchronous errors
    console.error('[Rate Limiter] Unexpected synchronous error:', error);
    return res.status(constants.HTTP_STATUS.SERVER_ERROR).json({ success: false, error: 'Internal Server Error' });
  }
}