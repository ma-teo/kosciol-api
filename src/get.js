const data = require('../data/data.json')
const secret = require('../data/secret.json')
const { cookieOptions } = require('./utils')

const getData = (req, res) => {
  res.cookie('logged', secret.token === req.query.token, cookieOptions).json(data)
}

const getType = (req, res) => {
  res.json(data[req.params.type])
}

const getSlug = (req, res) => {
  res.json(data[req.params.type].find(item => item.slug === req.params.slug))
}

module.exports = {
  getData,
  getType,
  getSlug
}
