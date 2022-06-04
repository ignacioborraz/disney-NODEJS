const db = require("../models")
const Usuario = db.Usuario

const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const userControllers = {

    signUpUser: async (req,res) => {
        //console.log('REQ BODY')
        //console.log(req.body)
        let {name, lastName, email, password, from, userPhoto, country} = req.body.userData
        const test = req.body.test
        try {
            const myTUser = await User.findOne({email})
            //console.log(myTUser)
            if (myTUser) { 
                //console.log('this number is:'+myTUser.from.indexOf(from))
                if (myTUser.from.indexOf(from) === 0) {
                    res.json({
                        success: false,
                        from: "SignUpForm",
                        message: `user ${email} already exists, please LOG IN!`}) 
                } else { 
                    const hashWord = bcryptjs.hashSync(password, 10) 
                    myTUser.from.push(from) 
                    myTUser.password.push(hashWord) 
                    if (from === "SignUpForm") { 
                        myTUser.uniqueString = crypto.randomBytes(15).toString('hex') 
                        await myTUser.save() 
                        await sendEmail(email, myTUser.uniqueString) 
                        res.json({
                            success: true, 
                            from: "SignUpForm", 
                            message: `check ${email}! we send you a mail to confirm your SIGN UP!`}) 
                    } else { 
                        myTUser.save() 
                        res.json({
                            success: true,
                            from:"externalSignUp", 
                            message: `user exist! LOG IN please!`})
                    }
                }
            } else {
                const hashWord = bcryptjs.hashSync(password, 10) //
                const myNewTUser = await new User({ 
                    name,
                    lastName,
                    email,
                    password: [hashWord],
                    from: [from],
                    uniqueString: crypto.randomBytes(15).toString('hex'),
                    userPhoto,
                    country,
                    verification: false})
                if (from === "SignUpForm") { 
                    await myNewTUser.save() 
                    await sendEmail(email, myNewTUser.uniqueString) 
                    res.json({
                        success: true, 
                        from:"SignUpForm",
                        message: `check ${email} and finish your SIGN UP!`}) 
                    } else { 
                    await myNewTUser.save()
                    res.json({
                        success: true, 
                        from:"externalSignUp",
                        message: `you SIGN UP by ${from}! now LOG IN!`})
                }
            }
        } catch (error) {
            console.log(error)
            res.json({success: false, message: "sorry! try in a few minutessssssssssssssssssss!"})
        }
    },

    logInUser: async (req, res) => {
        const {email, password, from} = req.body.userLogin
        try {
            const myTUser = await User.findOne({email}) 
            if (!myTUser) { 
                res.json({success: false, message: `${email} has no account in MyTinerary, please SIGN UP!`})
            } else { 
                if (from === "LogInForm") { 
                    if (myTUser.verification ) { 
                        let checkedWord =  myTUser.password.filter(pass => bcryptjs.compareSync(password, pass)) 
                        //console.log("resultado de busqueda de contraseña: " +(checkedWord.length >0))
                        if (checkedWord.length > 0) {
                            const userData = {
                                id: myTUser._id,
                                name: myTUser.name,
                                email: myTUser.email,
                                userPhoto: myTUser.userPhoto,
                                from: myTUser.from}
                            //console.log(userData)
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                            res.json({
                                success: true, 
                                from: from, 
                                response: {token, userData}, 
                                message: `welcome back ${userData.name}!`})
                        } else {
                            res.json({ success: false, 
                                from: from,  
                                message: `verify your password!`})
                        }
                    } else {
                        res.json({
                            success: false, 
                            from: from, 
                            message:`check ${email}! confirm your SIGN UP and LOG IN!`}) 
                    }
                } else {
                    let checkedWord =  myTUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                    //console.log(checkedWord)
                    if (checkedWord.length > 0) {
                        const userData = {
                            id: myTUser._id,
                            name: myTUser.name, 
                            email: myTUser.email,
                            userPhoto: myTUser.userPhoto,
                            from: myTUser.from}
                        //console.log(userData)
                        await myTUser.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        res.json({ success: true, 
                            from: from, 
                            response: {token, userData}, 
                            message: `welcome back ${userData.name}!`})
                    } else {
                        res.json({ success: false, 
                            from: from,  
                            message: `there is no register from ${from}, please SIGN UP`})
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.json({success: false, message: "sorry! try in a few minutes!"})
        }
    },

    signOutUser: async (req, res) => {
        const email = req.body.closeData
        const user = await User.findOne({email})
        await user.save()
        res.json(console.log(email+' sign out!'))
    },

    verifyToken:(req, res) => {
        //console.log(req.user)
        if (!req.err) {
        res.json({
            success: true,
            response: {id: req.user.id,
                name:req.user.name,
                email:req.user.email,
                userPhoto:req.user.userPhoto,
                from:"token"},
            message:"Hi! Welcome back "+req.user.name}) 
        } else {
            res.json({
                success:false,
                message:"sign in please!"}) 
        }
    },

    verifyEmail: async (req, res) => {
        const {uniqueString} = req.params;
        const user = await User.findOne({uniqueString: uniqueString})
        //console.log(user)
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("https://mytinerary-borraz.herokuapp.com/welcome")
        }
        else { res.json({success: false, response: `email has not been confirmed yet!`}) }
    }

}

const sendEmail = async (email, uniqueString) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "my.ty.borraz@gmail.com",
            pass: "Hola1234"
        }
    })
    let mailOptions = {
        from: 'my.ty.borraz@gmail.com',
        to: email,
        subject: "verify MyTinerary account",
        html: `
        <div>
            <h1><a href=https://mytinerary-borraz.herokuapp.com/api/verify/${uniqueString} style="color:red">CLICK!</a> to confirm you account.</h1>
            <h2>Thanks for signing up!</h2>
            <br>
            <h3>FIND YOUR PERFECT TRIP</h3>
            <h4>designed by insiders who know and love their cities!</h4>
        </div>
        `};
    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) { console.log(error) }
        else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = userControllers
