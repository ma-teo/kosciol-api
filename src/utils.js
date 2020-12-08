const fs = require('fs')
const https = require('https')
const nodemailer = require('nodemailer')
const jimp = require('jimp')
const paths = require('./paths')
const secret = require(paths.SECRET_PATH)

const recaptchaVerify = token => {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret.recaptcha_secret_key}&response=${token}`
    https.get(url, resp => {
      resp.on('data', data => JSON.parse(data).success ? resolve() : reject())
    }).on('error', reject)
  })
}

const sendMail = async body => {
  nodemailer.createTransport({
    host: secret.host,
    port: secret.port,
    auth: {
      user: secret.user,
      pass: secret.pass
    }
  })
  .sendMail({
    from: `"${body.user}" <${body.email}>`,
    to: secret.email,
    subject: 'Formularz kontaktowy - nowa wiadomość',
    text: body.message
  })
}

const checkUser = ({username, password}) => {
  const user = secret.users.find(({name, pass}) => name === username && pass === password)
  if (!user) throw new Error()
}

const saveToken = token => {
  return new Promise((resolve, reject) => {
    secret.token = token
    fs.writeFile(paths.SECRET_PATH, JSON.stringify(secret), err => err ? reject() : resolve())
  })
}

const checkToken = token => {
  if (!token || secret.token !== token) throw new Error()
}

const saveImage = async file => {
  const img = await jimp.read(file.buffer)
  await Promise.all([
    img.resize(1920, jimp.AUTO).quality(80).write(`${paths.MEDIA_PATH}/1920/${file.originalname}`),
    img.resize(1280, jimp.AUTO).quality(80).write(`${paths.MEDIA_PATH}/1280/${file.originalname}`),
    img.resize(640, jimp.AUTO).quality(80).write(`${paths.MEDIA_PATH}/640/${file.originalname}`)
  ])
}

module.exports = {
  recaptchaVerify,
  sendMail,
  checkUser,
  saveToken,
  checkToken,
  saveImage
}
