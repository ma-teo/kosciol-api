const fs = require('fs')
const https = require('https')
const jimp = require('jimp')
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

const postAdmin = (req, res) => {
  secret.users.find(user => user.name === req.body.username && user.pass === req.body.password)
  ? login(req, res) : res.json({ success: false })
}

const checkToken = req => {
  return new Promise((resolve, reject) => {
    secret.token === req.query.token ? resolve() : reject('checkToken error')
  })
}

const saveImage = req => {
  jimp.read(req.file.buffer).then(img => {
    Promise.all([
      img.resize(1920, jimp.AUTO).quality(80).write(`../kosciol-media/1920/${req.file.originalname}`),
      img.resize(1280, jimp.AUTO).quality(80).write(`../kosciol-media/1280/${req.file.originalname}`),
      img.resize(640, jimp.AUTO).quality(80).write(`../kosciol-media/640/${req.file.originalname}`)
    ])
    .catch('saveImage error')
  })
  .catch('saveImage error')
}

module.exports = {
  recaptchaVerify,
  login,
  postAdmin,
  checkToken,
  saveImage
}
