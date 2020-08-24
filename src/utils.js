const fs = require('fs')
const https = require('https')
const formidable = require('formidable')
const jimp = require('jimp')
const data = require('../data/data.json')
const secret = require('../data/secret.json')

const recaptchaVerify = (req, res, callback) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret.recaptcha_secret_key}&response=${req.query.token}`
  https.get(url, resp => {
    resp.on('data', data => {
      JSON.parse(data).success ? callback(req, res) : res.json({ success: false })
    })
  }).on('error', () => res.json({ success: false }))
}

const login = (req, res) => {
  secret.token = req.query.token
  fs.writeFile('data/secret.json', JSON.stringify(secret), err =>
    err ? res.json({ success: false }) : res.json({ success: true })
  )
}

const logout = (req, res) => {
  secret.token = undefined
  fs.writeFile('data/secret.json', JSON.stringify(secret), err =>
    err ? res.json({ success: false }) : res.json({ success: true })
  )
}

const checkToken = (req, res, callback) => {
  secret.token === req.query.token ? callback : res.json({ success: false })
}

const formParse = (req, res, callback) => {
  formidable().parse(req, (err, fields, files) => err ? res.json({ success: false }) : readFile(req, { fields, files }, res, callback))
}

const readFile = (req, { fields, files }, res, callback) => {
  files.image ? jimp.read(files.image.path).then(img => {
    Promise.all([
      img.resize(1920, jimp.AUTO).quality(80).write(`../kosciol-media/1920/${files.image.name}`),
      img.resize(1280, jimp.AUTO).quality(80).write(`../kosciol-media/1280/${files.image.name}`),
      img.resize(640, jimp.AUTO).quality(80).write(`../kosciol-media/640/${files.image.name}`)
    ])
    .then(callback(req, {fields, files}, res))
  })
  : callback(req, {fields, files}, res)
}

const writeFile = res => {
  fs.writeFile('data/data.json', JSON.stringify(data), err => err ? res.json({ success: false }) : res.json({ success: true, data: data }))
}

module.exports = {
  recaptchaVerify,
  login,
  logout,
  checkToken,
  formParse,
  readFile,
  writeFile
}
