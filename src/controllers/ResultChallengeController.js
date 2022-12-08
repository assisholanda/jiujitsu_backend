// Importação dos models que serão necessários
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const ResultChallenge = require('../models/Result_challenge');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const results = await ResultChallenge.findAll({ include: [
            { association: "champion", attributes: ["nickname"] },
            { association: "challenge", attributes: ["reason"], 
                include: [
                    { association: "challenged", attributes: ["nickname"] }
                ]
            },
            { association: "teacher", attributes: ["nickname"] },
        ],
        attributes: ["comment_teacher"]
    }
    );
        return res.json(results)
    },
    
    async store(req, res) {
        
        const user_id_teacher = req.userId;
        const { 
            comment_teacher,
            challenge_id,
            user_id_champion
         } = req.body;

        const teacher = await User.findByPk(user_id_teacher);
                
        if(teacher) {
            const champion = await User.findByPk(user_id_champion);
            if(champion) {
                const challenge = await Challenge.findByPk(challenge_id);
                if(!challenge) {
                    return res.status(400).json({ error: 'Desafio não existe.' })
                } 
            } else {
                return res.status(400).json({ error: 'Aluno vencedor não encontrado.' })
            }   
        } else {
            return res.status(400).json({ error: 'Professor não encontrado.' })
        }
        
        const result = await ResultChallenge.create({ 
            comment_teacher,
            challenge_id,
            user_id_champion,
            user_id_teacher
        });

        return res.json(result);
    },

    async update(req, res) {
        
        const { result_challenge_id } = req.params;
        const result_challenge = await ResultChallenge.findByPk(result_challenge_id);
 
        if(!result_challenge) {
            return res.status(401).json({ message: 'Resultado de desafio não encontrado.'})
        }
 
        await result_challenge.update(req.body);
        return res.status(200).json({ message: 'Resultado de desafio atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { result_challenge_id } = req.params;
        const userId = req.userId;
        const result_challenge = await ResultChallenge.findByPk(result_challenge_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!result_challenge) {
                return res.status(401).json({ message: 'Resultado de desafio não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await result_challenge.destroy();
                return res.status(200).json({ message: 'Resultado de desafio deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar resultado de desafio.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async ResultsUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const results = await ResultChallenge.findAll({ include: [
            { association: "champion", attributes: ["nickname"] },
            { association: "challenge", attributes: ["reason"], 
                include: [
                    { association: "challenged", attributes: ["nickname"] }
                ]
            },
            { association: "teacher", attributes: ["nickname"] },
        ],
            where: { 
                user_id_champion: user_id
            },
            attributes: ["comment_teacher"]
        });

        return res.json(results);
    }
    

}