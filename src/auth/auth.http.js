const authControllers = require('./auth.controller');
const userControllers = require('../users/users.controllers');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { toPromise } = require('../utils/toPromise');
const { loginSchema } = require('../utils/verify');

const generateUrl = (token, userId) => {
    return `/auth/verify-account?token=${token}&user_id${userId}`
}

const addUser = async (req, res) => {
    const [user, err] = await toPromise(userControllers.registerUser(req.body))
    if (err || !req.body) {
        console.log("este es mi error", err)
        res.status(400).json({ message: 'Data Missing' });
    }
    return res.status(201).json(user)
}

const generateVerifyToken = (req, res) => {
    if (!req.user.id) {
        res.status(400).json({message: 'No user register'})
    }
    const id = req.user.id;
    const token = authControllers.createToken(id)
    res.status(200).json({
        message: "Confirm your account in the next url",
        url: generateUrl(token, id)
    })
}

const verifyAccount = async (req, res) => {
     if (!req.query) {
         res.status(400).json({ message: 'No data' });
    }
    if (!req.query.token || !req.query.user_id) {
         res.status(400).json({ message: 'No data' });
    } else {
        const [tokenVerified, err] = await toPromise(authControllers.verifiedToken())
        if (err || !tokenVerified) {
            return res.status(401).json({ message: 'Invalid Credential' });
        }
        const [userVerified, error] = await toPromise(userControllers.verifiedUser())
        if (error || !userVerified) {
            return res.status(401).json({ message: 'Invalid Credential' });
        }
        //? Verificar mi cuenta de usuario
        //todo crear ambos controladores para modificar la tabla de usuarios a verificado:true
        //todo y la tabla de verify_tokens a used: true
        //? Esta ruta no esta protegida, todo es a base del req.query
        //todo crear las rutas necesarias para verificar la cuenta
    }
}

const loginUser = async (req, res) => {
    const data = loginSchema.validate(req.body)
    console.log(data)
    if (data.error) {
        return res.status(400).json({ message: data.error.details[0].message });
    } else if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: data.error.details[0].message });
    }
    const [response, error] = await toPromise(
        authControllers.checkUserCredential(
            data.value.email,
            data.value.password
        )
    );

    if (error || !response) {
        return res.status(401).json({ message: 'Invalid Credential' });
    }
    const [user, err] = await toPromise(
        userControllers.getUserByEmail(req.body.email)
    );

    if (err || !response) {
        return res.status(401).json({ message: 'Invalid Credential' });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: req.body.email,
        },
        config.jwtSecret
    );
    res.status(200).json({ token: token });
};



module.exports = {
    loginUser,
    generateUrl,
    generateVerifyToken,
    verifyAccount,
    addUser
};
