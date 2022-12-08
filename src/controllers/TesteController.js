// Importação dos models que serão necessários
const User = require('../models/User');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk( user_id, {
            include: [
                { 
                    association: 'schools',
                    attributes: ["description"]
                }
            ],
            attributes: ["name", "nickname"]
        }
    );
        return res.json(user)
    },
    
    async store(req, res) {
       
    }

   

}