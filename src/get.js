const schema = require('../data/schema.json')
const data = require('../data/data.json')
const secret = require('../data/secret.json')

const getData = (req, res) => {
  const logged = secret.token === req.query.token ? true : false
  res.json({ schema: schema, data: data, logged: logged })
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
