const port = process.env.PORT || 8000

const path = require('path')
const express = require('express')
const bodyParser    = require('body-parser')
const routes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))
app.set('view engine','pug')
app.set('views',path.join(__dirname,'./views'))

app.use('/', routes)
app.set('port', port)

module.exports = app
