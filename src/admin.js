const { recaptchaVerify, checkUser, saveToken } = require('./utils')

const login = async (req, res) => {
  try {
    await recaptchaVerify(req)
    checkUser(req)
    await saveToken(req)
    res.json({ success: true })
  }
  catch {
    res.json({ success: false })
  }
}

const logout = async (req, res) => {
  try {
    await saveToken(req)
    res.json({ success: true })
  }
  catch {
    res.json({ success: false })
  }
}

const postAdmin = (req, res) => {
  req.query.token ? login(req, res) : logout(req, res)
}

module.exports = {
  postAdmin
}
