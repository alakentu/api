const AuthService   = require('../services/auth.service');
const jwtConfig     = require('../config/jwt.config');
const bcryptUtil    = require('../utils/bcrypt.util');
const jwtUtil       = require('../utils/jwt.util');

exports.register = async (req, res) => { 
    const isUsernameExist = await AuthService.findUserByUsername(req.body.username);
    if(isUsernameExist) {
        return res.status(400).json({ 
            message: 'El nombre de usuario ya existe.' 
        });
    }
    const isEmailExist = await AuthService.findUserByEmail(req.body.email);
    if(isEmailExist) {
        return res.status(400).json({ 
            message: 'El correo ya existe.' 
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'Usuario registrado correctamente.'
    });
}

exports.login = async (req, res) => { 
    const user = await AuthService.findUserByUsername(req.body.username); 
    if (user) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        if (isMatched) {
            const token = await jwtUtil.createToken({ id: user.id });
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ message: 'No autorizado.' });
}

exports.getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);  
    return res.json({
        data: user,
        message: 'Correcto.'
    });
}

exports.logout = async (req, res) => {    
    await AuthService.logoutUser(req.token, req.user.exp);  
    return res.json({ message: 'Sesión cerrada correctamente.' });
}