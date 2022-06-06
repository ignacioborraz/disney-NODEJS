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
                const nuevoUsuario = await Usuario.create({nombre, mail, contraseña: bcryptjs.hashSync(contraseña,10), claveUnica: crypto.randomBytes(15).toString('hex'), verificacion: false})
                await enviarVerificacion(mail, nuevoUsuario.uniqueString) 
                return res.status(200).json({success: true, message: 'verifica tu correo'}) 
            }
        } catch (error) {
            return res.json({success: false, message: error})
        }
    },

    ingresar: async (req, res) => {
        const {mailIngresado,contraseñaIngresada} = req.body
        try {
            const usuario = await Usuario.findOne({where: {mail:mailIngresado}})
            if (!usuario) { 
                return res.json({success: false, message: 'no estás registrado'})
            } else { 
                if (usuario.verificacion) { 
                    if (bcryptjs.compareSync(contraseñaIngresada, usuario.contraseña)) {
                        const datosToken = {mail: usuario.mail}
                        jwt.sign({...datosToken}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        return res.status(200).json({success: true, response: datosToken, message: 'bienvenido '+usuario.nombre})
                    } else {
                        return res.status(400).json({ success: false, message: 'verifica tu contraseña'})
                    }
                } else {
                    return res.json({success: false, message: 'confirma tu correo'}) 
                }
                
            }
        } catch (error) {
            return res.json({success: false, message: error})
        }
    },

    verificarToken:(req, res) => {
        if (!req.err) {
            return res.json({success: true, response: {mail: req.usuario.mail}, message: 'bienvenido '+usuario.nombre})
        } else {
            return res.json({success:false, message: 'ingresa por favor'}) 
        }
    },

    enviarVerificacion:  async (req, res) => {
        console.log(sgMail)
        const {to,subject,text,html,sandboxMode=false} = req.body
        const correo = {
            to,
            from: 'ignacioborraz@hotmail.com',
            subject,
            text,
            html, //debe contener un link hacia el endpoint "/verify/:claveUnica" que activa al controlador siguiente
            mail_settings: {sandbox_mode: {enable: sandboxMode}}
        }
        try {
            await sgMail.send(correo)
        } catch (error) {
            return res.status(error.code).send(error.message)
        }
        return res.status(201).send({succes: true})
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

module.exports = controladorUsuarios
