const slugify = require('url-slug')
const secret = require('../data/secret.json')
const data = require('../data/data.json')
const { login, checkToken, readFile, writeFile } = require('./utils')

const postData = (req, res) => {
  checkToken(req)
  .then(req.file ? readFile(req) : undefined)
  .then(() => {
    data[req.params.type].push({
      cat_name: req.body.cat_name,
      cat_slug: req.body.cat_name ? slugify(req.body.cat_name) : undefined,
      content: req.body.content,
      date: req.body.date,
      image: req.file ? req.file.originalname : req.body.image,
      name: req.body.name,
      slug: req.body.name ? slugify(req.body.name) : undefined
    })
  })
  .then(writeFile)
  .then(data => res.json({ success: true, data: data }))
  .catch(error => res.json({ success: false, message: error }))
}

const postAdmin = (req, res) => {
  secret.users.find(user => user.name === req.body.username && user.pass === req.body.password)
  ? login(req, res) : res.json({ success: false })
}

module.exports = {
  postData,
  postAdmin
}
