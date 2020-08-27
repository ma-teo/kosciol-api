const fs = require('fs')
const https = require('https')
const jimp = require('jimp')
const secret = require('../data/secret.json')

const recaptchaVerify = req => {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret.recaptcha_secret_key}&response=${req.query.token}`
    https.get(url, resp => {
      resp.on('data', data => JSON.parse(data).success ? resolve() : reject())
    }).on('error', reject)
  })
}

const checkUser = req => {
  const user = secret.users.find(user => user.name === req.body.username && user.pass === req.body.password)
  if (!user) throw new Error()
}

const saveToken = req => {
  return new Promise((resolve, reject) => {
    secret.token = req.query.token
    fs.writeFile('data/secret.json', JSON.stringify(secret), err => err ? reject() : resolve())
  })
}

const checkToken = req => {
  if (secret.token !== req.query.token) throw new Error()
}

const saveImage = async req => {
  const img = await jimp.read(req.file.buffer)
  Promise.all([
    img.resize(1920, jimp.AUTO).quality(80).write(`../kosciol-media/1920/${req.file.originalname}`),
    img.resize(1280, jimp.AUTO).quality(80).write(`../kosciol-media/1280/${req.file.originalname}`),
    img.resize(640, jimp.AUTO).quality(80).write(`../kosciol-media/640/${req.file.originalname}`)
  ])
}

module.exports = {
  recaptchaVerify,
  checkUser,
  saveToken,
  checkToken,
  saveImage
}
