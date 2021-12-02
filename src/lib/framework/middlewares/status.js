module.exports = (req, res) => {
  res.status = (statusCode) => {
    res.writeHead(statusCode, { 'Content-type': 'application/json' });
    return res;
  };
};
