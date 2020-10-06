const fs = require('fs')
const slugify = require('url-slug')
const data = require('../../data.json')

const getData = ({params}, res) => {
  const resp =
    params.slug ? data[params.type]?.find(({slug}) => slug === params.slug) :
    params.type ? data[params.type] :
    data

  resp ? res.json(resp) : res.status(404).end()
}

const addData = ({params, body, file}) => {
  data[params.type].push({
    cat_name: body.cat_name,
    cat_slug: body.cat_name && slugify(body.cat_name),
    content: body.content,
    date: body.date,
    image: file ? file.originalname : body.image,
    name: body.name,
    slug: body.name && slugify(body.name)
  })
}

const editData = ({params, body, file}) => {
  data[params.type].splice(data[params.type].findIndex(({slug}) => slug === params.slug), 1, {
    cat_name: body.cat_name,
    cat_slug: body.cat_name && slugify(body.cat_name),
    content: body.content,
    date: body.date,
    image: file ? file.originalname : body.image,
    name: body.name,
    slug: body.name && slugify(body.name)
  })

  data.menu.filter(({slug}) => slug === params.slug).map(item => {
    item.name = body.name,
    item.slug = body.name && slugify(body.name)
  })

  data.arts.filter(({cat_slug}) => cat_slug === params.slug).map(item => {
    item.cat_name = body.name
    item.cat_slug = body.name && slugify(body.name)
  })
}

const removeData = ({params}) => {
  data[params.type].splice(data[params.type].findIndex(({slug}) => slug === params.slug), 1)
}

const saveData = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile('../data.json', JSON.stringify(data), err => err ? reject() : resolve(data))
  })
}

module.exports = {
  getData,
  addData,
  editData,
  removeData,
  saveData
}
