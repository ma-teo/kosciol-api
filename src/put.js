const slugify = require('url-slug')
const data = require('../data/data.json')
const { checkToken, readFile, writeFile } = require('./utils')

const putData = (req, res) => {
  checkToken(req)
  .then(req.file ? readFile(req) : undefined)
  .then(() => {
    data[req.params.type].splice(data[req.params.type].findIndex(item => item.slug === req.params.slug), 1, {
      cat_name: req.body.cat_name,
      cat_slug: req.body.cat_name ? slugify(req.body.cat_name) : undefined,
      content: req.body.content,
      date: req.body.date,
      image: req.file ? req.file.originalname : req.body.image,
      name: req.body.name,
      slug: req.body.name ? slugify(req.body.name) : undefined
    })

    data.menu.filter(item => item.slug === req.params.slug).map(item => {
      item.name = req.body.name,
      item.slug = req.body.name ? slugify(req.body.name) : undefined
    })

    data.arts.filter(item => item.cat_slug === req.params.slug).map(item => {
      item.cat_name = req.body.name
      item.cat_slug = req.body.name ? slugify(req.body.name) : undefined
    })
  })
  .then(writeFile)
  .then(data => res.json({ success: true, data: data }))
  .catch(error => res.json({ success: false, message: error }))
}

module.exports = {
  putData
}
