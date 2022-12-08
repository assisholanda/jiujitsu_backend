const School = require('../../models/School');

module.exports = {

    async index(req, res) {
        const schools = await School.findAll({ include: [
            { association: "teacher", attributes: ["nickname"] }
        ]});
        return res.json(schools)
    },

    async store(req, res) {
        const { description } = req.body;
        const school = await School.create({ description });       
        return res.json(school);
    },

    async update(req, res) {
        
        const { school_id } = req.params;
        const school = await School.findByPk(school_id);
 
        if(!school) {
            return res.status(401).json({ message: 'Escola/Academia não encontrada.'})
        }
 
        await school.update(req.body);
        return res.status(200).json({ message: 'Escola/Academia atualizada com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { school_id } = req.params;
        const school = await School.findByPk(school_id);

            if(!school) {
                return res.status(401).json({ message: 'Escola/Academia não encontrada.'})
            }

            await school.destroy();
            return res.status(200).json({ message: 'Escola/Academia deletada com sucesso.' });
    }

}