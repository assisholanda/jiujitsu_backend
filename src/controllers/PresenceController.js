// Importação dos models que serão necessários
const User = require('../models/User');
const Class = require('../models/Class');
const Presence = require('../models/Presence');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        
    },
    
    async store(req, res) {
        
        const { class_id } = req.params;
        const { 
            user_id_student
         } = req.body;

         let student = {};
         let belt_id = 0;

        const aula = await Class.findByPk(class_id);
                
        if(aula) {
            student = await User.findByPk(user_id_student);
            if(student) {
                belt_id = student.belt_id;
            }else {
                return res.status(400).json({ error: 'Aluno não encontrado.' })    
            }
        } else {
            return res.status(400).json({ error: 'Aula não encontrada.' })
        }

        const presenceClass = await Presence.create({ 
            class_id,
            user_id_student,
            belt_id
        });

        return res.json(presenceClass);
    }

}