const data = require('../data/data.json')
const { writeFile } = require('./utils')

const deleteData = (req, res) => {
  data[req.params.type].splice(data[req.params.type].findIndex(item => item.slug === req.params.slug), 1)

  writeFile(res)
}

module.exports = {
  deleteData
}
