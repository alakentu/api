const Joi           = require('joi');
const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {  
    if(!passwordRegex.test(String(value))) { 
        throw new Error('La contraseña debe contener una letra minúscula, una mayúscula y un dígito.')
    }
}

module.exports = {
    register: Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().alphanum().min(5).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required().external(validatePassword)
    }),
    login: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}