const { recaptchaVerify, sendMail } = require('./utils')

const postContact = async (req, res) => {
  try {
    await recaptchaVerify(req.query.token)
    await sendMail(req.body)
    res.json({ success: true })
  }
  catch {
    res.json({ success: false })
  }
}

module.exports = {
  postContact
}
