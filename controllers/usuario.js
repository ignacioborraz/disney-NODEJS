const Usuario = require("../models/usuario")

const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SECRET_KEY)

const controladorUsuarios = {

    registrar: async (req,res) => {
        let {nombre,mail,contraseña} = req.body
        try {
            const usuario = await Usuario.findOne({where: {mail:mail}})
            if (usuario) { 
                return res.status(200).json({success: false, message: 'ya estás registrado'}) 
            } else {
                let contraseñaHasheada = bcryptjs.hashSync(contraseña,10)
                let claveUnica = crypto.randomBytes(15).toString('hex')
                await enviarVerificacion(mail,claveUnica) 
                await Usuario.create({nombre, mail, contraseña: contraseñaHasheada, claveUnica: claveUnica, verificacion: false})
                return res.status(200).json({success: true, message: 'verifica tu correo'}) 
            }
        } catch (error) {
            console.log(error)
            return res.json({success: false, message: 'no se pudo'})
        }
    },

    ingresar: async (req, res) => {
        const {mail,contraseña} = req.body
        try {
            const usuario = await Usuario.findOne({where: {mail: mail}})
            if (!usuario) { 
                return res.json({success: false, message: 'no estás registrado'})
            } else { 
                if (usuario.verificacion) { 
                    if (bcryptjs.compareSync(contraseña, usuario.contraseña)) {
                        const datosToken = {nombre: usuario.nombre, mail: usuario.mail}
                        jwt.sign({datos: datosToken}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        return res.status(200).json({success: true, response: {response: datosToken}, message: 'bienvenido '+usuario.nombre})
                    } else {
                        return res.status(400).json({ success: false, message: 'verifica tu contraseña'})
                    }
                } else {
                    return res.json({success: false, message: 'confirma tu correo'}) 
                }
                
            }
        } catch (error) {
            console.log(error)
            return res.json({success: false, message: 'no se pudo'})
        }
    },

    verificarUsuario: async (req, res) => {
        const {claveUnica} = req.params
        const usuario = await Usuario.findOne({where: {claveUnica: claveUnica}})
        if (usuario) {
            await Usuario.update({verificacion: true}, {where: {claveUnica: claveUnica}})
            return res.redirect("") //debe contener un link hacia index/login
        }
        else {
            return res.json({success: false, response: `no confirmado`})
        }
    }

}

async function enviarVerificacion(mail,claveUnica) {
    const sandboxMode = false
    console.log(mail)
    const correo = {
        to: mail,
        from: 'ignacioborraz@hotmail.com',
        subject: "verificar mail",
        text: "verificar mail",
        html: "<a>verificar mail</a>", //debe contener un link hacia el endpoint "/verify/:claveUnica" que activa al controlador siguiente
        mail_settings: {sandbox_mode: {enable: sandboxMode}}
    }
    try {
        await sgMail.send(correo)
    } catch (error) {
        console.log(error)
    }
}

module.exports = controladorUsuarios
