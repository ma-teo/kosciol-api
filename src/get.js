const data = require('../data/data.json')

const getData = (req, res) => res.json(data)
const getType = ({params}, res) => res.json(data[params.type])
const getSlug = ({params}, res) => res.json(data[params.type].find(({slug}) => slug === params.slug))

module.exports = {
  getData,
  getType,
  getSlug
}
