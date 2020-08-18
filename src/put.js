const slugify = require('url-slug')
const data = require('../data/data.json')
const { writeFile } = require('./utils')

const putData = (req, { fields, files }, res) => {
  data[req.params.type].splice(data[req.params.type].findIndex(item => item.slug === req.params.slug), 1, {
    cat_name: fields.cat_name,
    cat_slug: fields.cat_name ? slugify(fields.cat_name) : undefined,
    content: fields.content,
    date: fields.date,
    image: files.image ? files.image.name : fields.image,
    name: fields.name,
    slug: fields.name ? slugify(fields.name) : undefined
  })

  data.menu.filter(item => item.slug === req.params.slug).map(item => {
    item.name = fields.name,
    item.slug = fields.name ? slugify(fields.name) : undefined
  })

  data.arts.filter(item => item.cat_slug === req.params.slug).map(item => {
    item.cat_name = fields.name
    item.cat_slug = fields.name ? slugify(fields.name) : undefined
  })

  writeFile(res)
}

module.exports = {
  putData
}
