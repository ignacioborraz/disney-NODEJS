const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 4000

const Router = require('./routes/routes')

app.set('port',PORT)
app.use(express.json())
app.use(cors())

app.use('/', Router)
app.get('/', (req,res)=> res.send('DISNEY API'))

module.exports = app