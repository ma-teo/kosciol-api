const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const { recaptchaVerify, login } = require('./src/utils')
const { getData, getType, getSlug } = require('./src/get')
const { postData, postAdmin } = require('./src/post')
const { putData } = require('./src/put')
const { deleteData } = require('./src/delete')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(multer().single('image'))

app.get('/', getData)
app.get('/:type', getType)
app.get('/:type/:slug', getSlug)

app.post('/:type', postData)
app.put('/:type/:slug', putData)
app.delete('/:type/:slug', deleteData)

app.post('/', (req, res) => req.query.token ? recaptchaVerify(req, res, postAdmin) : login(req, res))

app.listen(5000)
