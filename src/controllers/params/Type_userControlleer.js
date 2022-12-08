const Type_user = require('../../models/Type_user');

module.exports = {

    async index (req, res) {
        const typeUsers = await Type_user.findAll();
        return res.json(typeUsers);
    },

    async store (req, res) {
        const { description } = req.body;
        const typeUser = await Type_user.create({ description });
        return res.json(typeUser);
    },

    async update(req, res) {
        
        const { type_user_id } = req.params;
        const typeUser = await Type_user.findByPk(type_user_id);
 
        if(!typeUser) {
            return res.status(401).json({ message: 'Tipo de usuário não encontrado.'})
        }
 
        await typeUser.update(req.body);
        return res.status(200).json({ message: 'Tipo de usuário atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { type_user_id } = req.params;
        const typeUser = await Type_user.findByPk(type_user_id);

            if(!typeUser) {
                return res.status(401).json({ message: 'Tipo de usuário não encontrado.'})
            }

            await typeUser.destroy();
            return res.status(200).json({ message: 'Tipo de usuário deletado com sucesso.' });
    }

}