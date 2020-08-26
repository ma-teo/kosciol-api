const data = require('../data/data.json')
const { checkToken, writeFile } = require('./utils')

const deleteData = (req, res) => {
  checkToken(req)
  .then(() => {
    data[req.params.type].splice(data[req.params.type].findIndex(item => item.slug === req.params.slug), 1)
  })
  .then(writeFile)
  .then(data => res.json({ success: true, data: data }))
  .catch(error => res.json({ success: false, message: error }))
}

module.exports = {
  deleteData
}
