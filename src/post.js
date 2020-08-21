const fs = require('fs')
const slugify = require('url-slug')
const secret = require('../data/secret.json')
const data = require('../data/data.json')
const { writeFile, login } = require('./utils')

const postData = (req, { fields, files }, res) => {
  data[req.params.type].push({
    cat_name: fields.cat_name,
    cat_slug: fields.cat_name ? slugify(fields.cat_name) : undefined,
    content: fields.content,
    date: fields.date,
    image: files.image ? files.image.name : fields.image,
    name: fields.name,
    slug: fields.name ? slugify(fields.name) : undefined
  })

  writeFile(res)
}

const postAdmin = (req, res) => {
  secret.users.find(user => user.name === req.body.username && user.pass === req.body.password)
  ? login(req, res) : res.json({ success: false })
}

module.exports = {
  postData,
  postAdmin
}
