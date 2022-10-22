//? DEPENCIES
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const multer = require('multer');


//? IMPORT FILES
const config = require('./config');
const { transporter } = require('./utils/email');
const userRoutes = require('./users/user.routes').router
const customerRoutes = require('./customers/customer.routes').router
const authRoutes = require('./auth/auth.routes').router

//! INITIAL CONFIGURATION
const app = express()


app.use(express.json())
const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +file.originalname)
    }
}) 
const upload = multer({ storage });
app.use(express.urlencoded({ extended: true }))
app.use(cors())
if (config.node_env === 'development') {
    app.use(morgan('dev'))
} else {
    app.use(morgan('combined'))
}

//*ROUTES
app.get('/', (req, res) => {
    res.status(200).json({message: 'Funciona'})
})
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/customer', customerRoutes);
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.get('/email', (req, res) => {
    transporter.sendMail({
        subject: 'Prueba',
        text: 'Enviando un correo electronico desde nodemailer',
        to: 'bfix40@gmail.com',
        from: 'fx4038@gmail.com',
    });
    res.status(200).json({message:'Email sent'})
})
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(201)
            .send(req.file)
    } catch (error) {
        res.status(400).json({ message: "error"})
    }
})
app.get('/files/:name', (req, res) => {
    res.sendFile(__dirname + `/uploads/${req.params.name}`)
})
app.listen(config.port, () => {
    console.log(`Sever has started in port ${config.port}`)
})

module.exports = {
    app
}

/*
//? get /users/:id ADMIN
//? delete /users/me CLIENTE
//? delete /users/:id ADMIN
 */