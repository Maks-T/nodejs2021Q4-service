const ERROR_APP = require("../constants");

module.exports = (req) => {
  try {
    if (req.body) {
      const parsedBody = JSON.parse(req.body);
      req.body = parsedBody;
    }
  } catch (e) {
    req.emit('error', new Error(ERROR_APP.BROKEN_BODY));
  }
};
