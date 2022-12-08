const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const helpers = require('../config/helper');

module.exports = {

    async verifySession(req, res, next) {

        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({ message: 'Token de autenticação não enviado.' });
        }

        const [, token] = authHeader.split(' ');

        try {

            const decoded = await promisify(jwt.verify)(token, helpers.auth.KEY_WORD);
            req.userId = decoded.id;

            return next();

        } catch (err) {
            return res.status(401).json({ message: 'Token de autenticação inválido.' });
        }
    
    }

}

