const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    const { username, email, password } = req.body
    console.log("Inside register request");

    try {
        // check email already exist

        const existingUser = await users.findOne({ email })
        console.log(existingUser);

        if (existingUser) {
            res.status(406).json("User Already Exist!!! Please Login")
        } else {
            //order is matter like schema
            const newUser = new users({
                username, email, password, profile: '', github: '', linkedin: ''
            })
            await newUser.save()
            res.status(200).json(newUser)


        }
    } catch (err) {
        res.status(401).json(err)
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log("Inside login request");

    try {
        // check email,paswrd already exist

        const existingUser = await users.findOne({ email, password })
        console.log(existingUser);

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.jwt_secret)
            res.status(200).json({ existingUser, token })


        } else {
            res.status(406).json("Invalid Email/Password")


        }
    } catch (err) {
        res.status(401).json(err)
    }
}