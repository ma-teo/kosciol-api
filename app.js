const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { recaptchaVerify, login, checkToken, formParse } = require('./src/utils')
const { getData, getType, getSlug } = require('./src/get')
const { postData, postAdmin } = require('./src/post')
const { putData } = require('./src/put')
const { deleteData } = require('./src/delete')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', getData)
app.get('/:type', getType)
app.get('/:type/:slug', getSlug)

app.post('/:type', (req, res) => checkToken(req, res, formParse(req, res, postData)))
app.put('/:type/:slug', (req, res) => checkToken(req, res, formParse(req, res, putData)))
app.delete('/:type/:slug', (req, res) => checkToken(req, res, deleteData(req, res)))

app.post('/', (req, res) => req.query.token ? recaptchaVerify(req, res, postAdmin) : login(req, res))

app.listen(5000)
