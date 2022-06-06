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

it('envia correctamente el correo', async () => {
    return request(app)
        .post('/mail')
        .send({
            to: 'ijb9790@gmail.com',
            subject: 'Hola',
            text: 'Texto',
            html: '<strong>Hola</strong>',
            sandboxMode: true
        })
        .expect(201)
})

it('error por datos invalidos para el envío de correo de verificacion', async () => {
    return request(app)
        .post('/mail')
        .send({
            to: 'ijb9790',
            subject: '',
            text: '',
            html: '<strong>Hola</strong>',
            sandboxMode: true
        })
        .expect(400)
})