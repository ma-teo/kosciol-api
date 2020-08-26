const fs = require('fs')
const slugify = require('url-slug')
const data = require('../data/data.json')

const getData = ({params}, res) => {
  params.slug ? res.json(data[params.type].find(({slug}) => slug === params.slug)) :
  params.type ? res.json(data[params.type]) :
  res.json(data)
}

const addData = req => {
  data[req.params.type].push({
    cat_name: req.body.cat_name,
    cat_slug: req.body.cat_name && slugify(req.body.cat_name),
    content: req.body.content,
    date: req.body.date,
    image: req.file ? req.file.originalname : req.body.image,
    name: req.body.name,
    slug: req.body.name && slugify(req.body.name)
  })
}

const editData = req => {
  data[req.params.type].splice(data[req.params.type].findIndex(item => item.slug === req.params.slug), 1, {
    cat_name: req.body.cat_name,
    cat_slug: req.body.cat_name && slugify(req.body.cat_name),
    content: req.body.content,
    date: req.body.date,
    image: req.file ? req.file.originalname : req.body.image,
    name: req.body.name,
    slug: req.body.name && slugify(req.body.name)
  })

  data.menu.filter(item => item.slug === req.params.slug).map(item => {
    item.name = req.body.name,
    item.slug = req.body.name && slugify(req.body.name)
  })

  data.arts.filter(item => item.cat_slug === req.params.slug).map(item => {
    item.cat_name = req.body.name
    item.cat_slug = req.body.name && slugify(req.body.name)
  })
}

const removeData = req => {
  data[req.params.type].splice(data[req.params.type].findIndex(item => item.slug === req.params.slug), 1)
}

const saveData = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/data.json', JSON.stringify(data), err => err ? reject('saveData error') : resolve(data))
  })
}

module.exports = {
  getData,
  addData,
  editData,
  removeData,
  saveData
}
