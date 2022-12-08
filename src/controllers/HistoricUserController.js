// Importação dos models que serão necessários
const User = require('../models/User');
const HistoricUser = require('../models/Historic_user');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const historics = await HistoricUser.findAll({ include: [
            { association: "student", attributes: ["nickname"],
                include:[ 
                    { association: "belt", attributes: ["description"] },
                    { association: "school", attributes: ["description"] },
                ] 
            },
            { association: "register", attributes: ["nickname"] }
        ],
        attributes: ["date", "description", "show_student", "path_image"]
    }
    );
        return res.json(historics)
    },
    
    async store(req, res) {
        
        const user_id_register = req.userId;
        const { 
            description,
            date,
            show_student,
            path_image,
            user_id_student
         } = req.body;

        const userRegister = await User.findByPk(user_id_register);
                
        if(userRegister) {
            const userStudent = await User.findByPk(user_id_student);
            if(!userStudent) {
                return res.status(400).json({ error: 'Aluno não encontrado.' })
            }            
        } else {
            return res.status(400).json({ error: 'Usuário não encontrado.' })
        }

        const historic = await HistoricUser.create({ 
            description,
            date,
            show_student,
            path_image,
            user_id_student,
            user_id_register
        });

        return res.json(historic);
    },

    async update(req, res) {
        
        const { historic_id } = req.params;
        const historic = await HistoricUser.findByPk(historic_id);
 
        if(!historic) {
            return res.status(401).json({ message: 'Histórico não encontrado.'})
        }
 
        await historic.update(req.body);
        return res.status(200).json({ message: 'Histórico atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { historic_id } = req.params;
        const userId = req.userId;
        const historic = await HistoricUser.findByPk(historic_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!historic) {
                return res.status(401).json({ message: 'Histórico não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await historic.destroy();
                return res.status(200).json({ message: 'Histórico deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar histórico.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async historictUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const historic = await HistoricUser.findAll({ include: [
            { association: "student", attributes: ["name", "nickname"] },
            { association: "register", attributes: ["nickname"] }
        ], 
            where: { 
                user_id_student: user_id,
                show_student: true
            },
            attributes: ["date", "description", "show_student", "path_image"]
        });

        return res.json(historic);
    }
    

}