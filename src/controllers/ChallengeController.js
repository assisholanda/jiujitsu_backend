// Importação dos models que serão necessários
const User = require('../models/User');
const Challenge = require('../models/Challenge');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const challenges = await Challenge.findAll({ include: [
            { association: "challenger", attributes: ["nickname"] },
            { association: "challenged", attributes: ["nickname"] },
            { association: "teacher", attributes: ["nickname"] },
            { association: "school", attributes: ["description"] },
        ],
        attributes: ["date", "reason", "status", "is_acepted"]
    }
    );
        return res.json(challenges)
    },
    
    async store(req, res) {
        
        let school_id = 0;
        let user_id_teacher = 0;
        const user_id_challenger = req.userId;
        const { 
            date,
            reason,
            user_id_challenged
         } = req.body;

        const userChallenger = await User.findByPk(user_id_challenger, 
        {
            include: [
                { association: "school", attributes: ["description"],
                include:[ 
                    { association: "teacher", attributes: ["id", "nickname"] },
                ] 
                }
            ]
        });
                
        if(userChallenger) {
            const userChallenged = await User.findByPk(user_id_challenged);
            if(!userChallenged) {
                return res.status(400).json({ error: 'Aluno desafiado não encontrado.' })
            } else {
                user_id_teacher = userChallenger.school.teacher.id;
                school_id = userChallenger.school_id;
            }   
        } else {
            return res.status(400).json({ error: 'Aluno desafiador não encontrado.' })
        }

        const challenge = await Challenge.create({ 
            date,
            reason,
            user_id_challenger,
            user_id_challenged,
            user_id_teacher,
            school_id
        });

        return res.json(challenge);
    },

    async update(req, res) {
        
        const { challenge_id } = req.params;
        const challenge = await Challenge.findByPk(challenge_id);
 
        if(!challenge) {
            return res.status(401).json({ message: 'Desafio não encontrado.'})
        }
 
        await challenge.update(req.body);
        return res.status(200).json({ message: 'Desafio atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { challenge_id } = req.params;
        const userId = req.userId;
        const challenge = await Challenge.findByPk(challenge_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!challenge) {
                return res.status(401).json({ message: 'Desafio não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await challenge.destroy();
                return res.status(200).json({ message: 'Desafio deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar desafios.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async challengersUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const challenges = await Challenge.findAll({ include: [
                { association: "challenged", attributes: ["nickname"] },
                { association: "teacher", attributes: ["nickname"] },
                { association: "school", attributes: ["description"] },
            ],
            where: { 
                user_id_challenger: user_id
            },
            attributes: ["date", "reason", "status", "is_acepted"]
        });

        return res.json(challenges);
    }
    

}