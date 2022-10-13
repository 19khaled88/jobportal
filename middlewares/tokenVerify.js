const jwt = require('jsonwebtoken')

const { promisify } = require('util')
const SECRET =
  'd7ebe201edbeb884b8ae158ad12b3f6d6874dad1d571d9ad61f29456e3c87b862ce5bca3102d72a6eb0055aa6cb359ea57c1d1c659b5eef4e8aaf6111b86bee96f7275e76f324e3f4ec707840a26aba16dc11387cf0a4f461dfcbd11882cdfb5d6f4aff16f416186161f5cdfc88003f80b88d33436a5348eb6eec0d43fec566415c14adb788df1ad04a43f932229a938397cdc857ac82d34f0af08a8baf00ff968e3ae8686b21d03b23243e1f7389b05244ffacad5e38437008e8f27be7769612d45a9aa8b44eeeda4a16798a0c35a41c6d4a5d2ad5ef14d325fc1be8f1511bd50c00d29aec419f82c2fb2be022a8c51b83eabaeb415a162c0978284d2ba7218'
module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'you are not logged in',
      })
    }

    const decoded = await promisify(jwt.verify)(token, SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'Invalid token',
    })
  }
}
