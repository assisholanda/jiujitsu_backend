const jwt = require('jsonwebtoken');
const User = require('../models/User');
const helpers = require('../config/helper');

module.exports = {

    async store (req, res) {

        const { email, password } = req.body;

        const user = await User.findOne({
            where : { email }
        });

        if(!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }

        if(!(await user.checkPassword(password))) {
            return res.status(401).json({ message: 'Senha incorreta.' })
        }

        const { id, nickname } = user;

        const token = {
            user: { id, nickname, email },
            token: jwt.sign( {id},
                             helpers.auth.KEY_WORD, 
                             { expiresIn: helpers.auth.expiresIn }
                            )
        }
        
        return res.json(token)

    }

}