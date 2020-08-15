const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { recaptchaVerify, checkToken, formParse } = require('./src/utils')
const { getData, getType, getSlug } = require('./src/get')
const { postData, postAdmin } = require('./src/post')
const { putData } = require('./src/put')
const { deleteData } = require('./src/delete')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/media/*', (req, res) => res.sendFile(path.join(__dirname, req.path)))

app.get('/data', (req, res) => getData(req, res))
app.get('/data/:type', (req, res) => getType(req, res))
app.get('/data/:type/:slug', (req, res) => getSlug(req, res))

app.post('/data/:type', (req, res) => checkToken(req, res, formParse(req, res, postData)))
app.put('/data/:type/:slug', (req, res) => checkToken(req, res, formParse(req, res, putData)))
app.delete('/data/:type/:slug', (req, res) => checkToken(req, res, deleteData(req, res)))

app.post('/admin', (req, res) => recaptchaVerify(req, res, postAdmin))

app.listen(5000)
