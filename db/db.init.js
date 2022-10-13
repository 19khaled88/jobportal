const mongoose = require('mongoose')
require('dotenv').config()
// const { DB_NAME, DB_USER_NAME, DB_PASS } = process.env
const DB_USER_NAME = 'khaled'
const DB_PASS = 'VNHAybzMnVDF6NMq'
const DB_NAME = 'jobportal'
mongoose.connect(
  `mongodb+srv://${DB_USER_NAME}:${DB_PASS}@cluster0.ka5da.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true
  },
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', function () {
  console.log('Job Portal DB is connected')
})

module.exports = db
