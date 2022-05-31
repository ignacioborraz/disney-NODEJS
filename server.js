const {Sequelize} = require('sequelize')
const {database} = require ('./config')
//const Router = require('./routes/routes')

const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000
app.set('port',PORT)

const cors = require('cors')

const sequelize = new Sequelize(database.database,database.username,database.password, {
    host: database.host,
    dialect: database.dialect
})

app.get('/', (req,res)=> res.send('DISNEY API'))
app.use(cors())
app.use(express.json())
//app.use('/api', Router)
app.listen(app.get('port'), async function() {
    console.log('SERVER READY ON PORT '+app.get('port'))
    sequelize.authenticate()
        .then(() => console.log('DATABASE CONNECTED'))
        .catch((error) => console.log(error))
})

module.exports = sequelize