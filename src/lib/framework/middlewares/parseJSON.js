module.exports = (req, res) => {
  res.send = (data) => {
    res.end(JSON.stringify(data));
  };
};
