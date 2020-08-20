const types = require('../data/types.json')
const data = require('../data/data.json')
const secret = require('../data/secret.json')

const getData = (req, res) => {
  const logged = secret.token === req.query.token ? true : false
  res.json({ types: types, data: data, logged: logged })
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
