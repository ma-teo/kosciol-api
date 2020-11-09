const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const { getData } = require('./data')
const { postAdmin } = require('./admin')
const { postContact } = require('./contact')
const { postData, putData, deleteData } = require('./api')

express()
  .use(cors())
  .use(bodyParser.json())
  .use(multer().single('image'))

  .get('/', getData)
  .get('/:type', getData)
  .get('/:type/:slug', getData)

  .post('/', postAdmin)
  .post('/kontakt', postContact)

  .post('/:type', postData)
  .put('/:type/:slug', putData)
  .delete('/:type/:slug', deleteData)

  .listen(3000)
