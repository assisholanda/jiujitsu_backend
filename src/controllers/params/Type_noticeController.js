const Type_notice = require('../../models/Type_notice');

module.exports = {

    async index(req, res) {
        const typeNotices = await Type_notice.findAll();
        res.json(typeNotices);
    },

    async store (req, res) {
        const {description} = req.body;
        const typeNotice = await Type_notice.create({ description });
        return res.json(typeNotice);
    },

    async update(req, res) {
        
        const { type_notice_id } = req.params;
        const typeNotice = await Type_notice.findByPk(type_notice_id);
 
        if(!typeNotice) {
            return res.status(401).json({ message: 'Tipo de aviso não encontrado.'})
        }
 
        await typeNotice.update(req.body);
        return res.status(200).json({ message: 'Tipo de aviso atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { type_notice_id } = req.params;
        const typeNotice = await Type_notice.findByPk(type_notice_id);

            if(!typeNotice) {
                return res.status(401).json({ message: 'Tipo de aviso não encontrado.'})
            }

            await typeNotice.destroy();
            return res.status(200).json({ message: 'Tipo de aviso deletado com sucesso.' });
    }

}