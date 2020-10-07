const { checkToken, saveImage } = require('./utils')
const { addData, editData, removeData, saveData } = require('./data')

const postData = async (req, res) => {
  try {
    checkToken(req.query.token)
    addData(req)
    req.file && await saveImage(req.file)
    const data = await saveData()
    res.json({ success: true, data: data })
  }
  catch {
    res.json({ success: false })
  }
}

const putData = async (req, res) => {
  try {
    checkToken(req.query.token)
    editData(req)
    req.file && await saveImage(req.file)
    const data = await saveData()
    res.json({ success: true, data: data })
  }
  catch {
    res.json({ success: false })
  }
}

const deleteData = async (req, res) => {
  try {
    checkToken(req.query.token)
    removeData(req)
    const data = await saveData()
    res.json({ success: true, data: data })
  }
  catch {
    res.json({ success: false })
  }
}

module.exports = {
  postData,
  putData,
  deleteData
}
