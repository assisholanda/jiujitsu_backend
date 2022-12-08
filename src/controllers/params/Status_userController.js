const Status_user = require('../../models/Status_user');

module.exports = {

    async index (req, res) {
        const statusUser = await Status_user.findAll();
        return res.json(statusUser);
    },

    async store (req, res) {
        const { description } = req.body;
        const statusUser = await Status_user.create({ description });
        return res.json(statusUser);
    },

    async update(req, res) {
        
        const { status_user_id } = req.params;
        const statusUser = await Status_user.findByPk(status_user_id);
 
        if(!statusUser) {
            return res.status(401).json({ message: 'Status do usuário não encontrado.'})
        }
 
        await statusUser.update(req.body);
        return res.status(200).json({ message: 'Status do usuário atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { status_user_id } = req.params;
        const statusUser = await Status_user.findByPk(status_user_id);

            if(!statusUser) {
                return res.status(401).json({ message: 'Status do usuário não encontrado.'})
            }

            await statusUser.destroy();
            return res.status(200).json({ message: 'Status do usuário deletado com sucesso.' });
    }
}