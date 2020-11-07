const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const { getData } = require('./data')
const { postAdmin } = require('./admin')
const { postContact } = require('./contact')
const { postData, putData, deleteData } = require('./api')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(multer().single('image'))

app.get('/', getData)
app.get('/:type', getData)
app.get('/:type/:slug', getData)

app.post('/', postAdmin)
app.post('/kontakt', postContact)

app.post('/:type', postData)
app.put('/:type/:slug', putData)
app.delete('/:type/:slug', deleteData)

app.listen(3000)
