const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { recaptchaVerify, logout, checkToken, formParse } = require('./src/utils')
const { getData, getType, getSlug } = require('./src/get')
const { postData, postAdmin } = require('./src/post')
const { putData } = require('./src/put')
const { deleteData } = require('./src/delete')

require('dotenv').config()

const app = express()

app.use(cors({
  origin: process.env.REACT_APP_SITE_URL,
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => getData(req, res))
app.get('/:type', (req, res) => getType(req, res))
app.get('/:type/:slug', (req, res) => getSlug(req, res))

app.post('/:type', (req, res) => checkToken(req, res, formParse(req, res, postData)))
app.put('/:type/:slug', (req, res) => checkToken(req, res, formParse(req, res, putData)))
app.delete('/:type/:slug', (req, res) => checkToken(req, res, deleteData(req, res)))

app.post('/', (req, res) => recaptchaVerify(req, res, postAdmin))
app.put('/', (req, res) => logout(req, res))

app.listen(5000)
