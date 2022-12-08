// Importação dos models que serão necessários
const Class = require('../models/Class');
const School = require('../models/School');
const User = require('../models/User');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const classes = await Class.findAll();
        return res.json(classes)
    },
    
    async store(req, res) {
        const { description, date, school_id } = req.body;
        const school = School.findByPk(school_id);

        if(!school) {
            return res.status(400).json({ message: "Academia/Escola não encontrada." });
        } 

        const aula = await Class.create({ description, date, school_id });
        return res.json(aula);
    },

    async update(req, res) {
        
        const { class_id } = req.params;
        const aula = await Class.findByPk(class_id);
 
        if(!aula) {
            return res.status(401).json({ message: 'Aula não encontrada.'})
        }
 
        await aula.update(req.body);
        return res.status(200).json({ message: 'Aula atualizada com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { class_id } = req.params;
        const userId = req.userId;
        const aula = await Class.findByPk(class_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!aula) {
                return res.status(401).json({ message: 'Aula não encontrada.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await aula.destroy();
                return res.status(200).json({ message: 'Aula deletada com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar aulas.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async classesSchool(req, res) {

        const { school_id } = req.params;

        const classes = await Class.findAll({
            include: [
                { association: 'school', attributes: ["description"] },
                { association: 'presences', attributes: ["id"], 
                    include: [
                        { association: 'student', attributes: ["nickname"],
                            include: [
                                { association: 'belt', attributes: ["description"]}
                            ]
                        }
                    ]}
            ],
            where: { 
                school_id: school_id
            },
            attributes: ["date", "description"]
        });

        return res.json(classes);


    }

}