//todo: funcion para encriptar contraseña
//todo: funcion para comparar contraseñas para hacer el login

const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10);
};

const comparePassword = (plainPassword, hashPassword) => {
    return bcrypt.compareSync(plainPassword, hashPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};