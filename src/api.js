const { checkToken, saveImage } = require('./utils')
const { addData, editData, removeData, saveData } = require('./data')

const postData = (req, res) => {
  checkToken(req)
  .then(req.file && saveImage(req))
  .then(addData(req))
  .then(saveData)
  .then(data => res.json({ success: true, data: data }))
  .catch(error => res.json({ success: false, message: error }))
}

const putData = (req, res) => {
  checkToken(req)
  .then(req.file && saveImage(req))
  .then(editData(req))
  .then(saveData)
  .then(data => res.json({ success: true, data: data }))
  .catch(error => res.json({ success: false, message: error }))
}

const deleteData = (req, res) => {
  checkToken(req)
  .then(removeData(req))
  .then(saveData)
  .then(data => res.json({ success: true, data: data }))
  .catch(error => res.json({ success: false, message: error }))
}

module.exports = {
  postData,
  putData,
  deleteData
}
