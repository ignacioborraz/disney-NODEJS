const app = require('./app')
const sequelize = require('./config/sequelize')
require('./config/associations')

app.listen(app.get('port'), async function() {
    console.log('SERVER READY ON PORT '+app.get('port'))
    sequelize.sync({force:false})
        .then(() => console.log('DATABASE CONNECTED'))
        .catch(error => console.log(error))
})