const fs = require('fs')
const https = require('https')
const jimp = require('jimp')
const secret = require('../data/secret.json')

const recaptchaVerify = token => {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret.recaptcha_secret_key}&response=${token}`
    https.get(url, resp => {
      resp.on('data', data => JSON.parse(data).success ? resolve() : reject())
    }).on('error', reject)
  })
}

const checkUser = ({username, password}) => {
  const user = secret.users.find(({name, pass}) => name === username && pass === password)
  if (!user) throw new Error()
}

const saveToken = token => {
  return new Promise((resolve, reject) => {
    secret.token = token
    fs.writeFile('data/secret.json', JSON.stringify(secret), err => err ? reject() : resolve())
  })
}

const checkToken = token => {
  if (secret.token !== token) throw new Error()
}

const saveImage = async file => {
  const img = await jimp.read(file.buffer)
  await Promise.all([
    img.resize(1920, jimp.AUTO).quality(80).write(`../kosciol-media/1920/${file.originalname}`),
    img.resize(1280, jimp.AUTO).quality(80).write(`../kosciol-media/1280/${file.originalname}`),
    img.resize(640, jimp.AUTO).quality(80).write(`../kosciol-media/640/${file.originalname}`)
  ])
}

module.exports = {
  recaptchaVerify,
  checkUser,
  saveToken,
  checkToken,
  saveImage
}
