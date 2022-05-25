const app = require('./app')

require('dotenv').config()
const port = process.env.PORT || 8000
const cors = require('cors')

const sequelize = require('./database/db')

app.use(cors())
app.listen(port, function() {
    console.log('SERVER READY ON PORT '+port)
/*     sequelize.sync({force:false})
        .then(() => console.log('DATABASE CONNECTED'))
        .catch((error) => console.log(error)) */
})