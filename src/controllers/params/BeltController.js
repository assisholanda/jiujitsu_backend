// Importação dos models que serão necessários
const Belt = require('../../models/Belt');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const belts = await Belt.findAll();
        return res.json(belts)
    },
    
    async store(req, res) {
        const { description } = req.body;
        const belt = await Belt.create({ description });
        return res.json(belt);
    },

    async update(req, res) {
        
        const { belt_id } = req.params;
        const belt = await Belt.findByPk(belt_id);
 
        if(!belt) {
            return res.status(401).json({ message: 'Faixa não encontrada.'})
        }
 
        await belt.update(req.body);
        return res.status(200).json({ message: 'Faixa atualizada com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { belt_id } = req.params;
        const belt = await Belt.findByPk(belt_id);

            if(!belt) {
                return res.status(401).json({ message: 'Faixa não encontrada.'})
            }

            await belt.destroy();
            return res.status(200).json({ message: 'Faixa deletada com sucesso.' });
    }

}