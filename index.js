const express = require('express')
const app = express()
const cors = require('cors')
const port = 9000 || process.env.PORT

// middleware
require('dotenv').config()
const db = require('./db/db.init.js')

app.use(express.json())
app.use(cors())

db

app.get('/test', (req, res, next) => {
  res.send('tested')
})

//all routes
const userRoute = require('./routes/user.route.js')
const managerRoute = require('./routes/manager.route.js')
const jobRoute = require('./routes/job.route.js')
const adminRoute = require('./routes/admin.route.js')
app.use('/api/v1/user', userRoute)
app.use('/api/v1/manager/jobs',managerRoute)
app.use('/api/v1/jobs',jobRoute)
app.use('/api/v1/admin',adminRoute)
app.listen(port, () => {
  console.log(`Wroks are going on for ACC assignment-3 on port ${port}`)
})
