const request = require('supertest')
const app = require('./app')

it('usuario creado', async () => {
    return request(app)
        .post('/auth/register')
        .send({
            nombre: "nombre",
            mail: "ignacio@gmail.com",
            contraseña: "123456",
            verificacion: true
        })
        .expect(200)
})

it('usuario inició sesión', async () => {
    return request(app)
        .post('/auth/login')
        .send({
            mail: "ignacio@gmail.com",
            contraseña: "123456",
        })
        .expect(200)
})