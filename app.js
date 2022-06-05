const express = require('express')
const app = express()
const sequelize = require('./config/sequelize')
require('./config/associations')

require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 4000

const Router = require('./routes/routes')

app.set('port',PORT)
app.use(express.json())
app.use(cors())

app.use('/', Router)
app.get('/', (req,res)=> res.send('DISNEY API'))

app.listen(app.get('port'), async function() {
    console.log('SERVER READY ON PORT '+app.get('port'))
    sequelize.sync({force:false})
        .then(() => console.log('DATABASE CONNECTED'))
        .catch(error => console.log(error))
})