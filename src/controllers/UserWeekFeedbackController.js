// Importação dos models que serão necessários
const User = require('../models/User');
const WeekFeedBackTeacher = require('../models/Weeks_feedback_teacher');
const UserWeekFeedback = require('../models/User_week_feedback');

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
        
        const { week_feedback_id } = req.params;
        const { 
            user_id_student,
            type_feedback_id
         } = req.body;

        const weekFeedBackId = await WeekFeedBackTeacher.findByPk(week_feedback_id);
                
        if(!weekFeedBackId) {
            return res.status(400).json({ error: 'FeedBack semanal não encontrado.' })
        } 
        
        const userWeekFeedback = await UserWeekFeedback.create({ 
            week_feedback_id,
            user_id_student,
            type_feedback_id
        });

        return res.json(userWeekFeedback);
    },

    async update(req, res) {
        
        const { userWeeekFeedbac_Id } = req.params;
        const userWeekFeedback = await UserWeekFeedback.findByPk(userWeeekFeedbac_Id);
 
        if(!userWeekFeedback) {
            return res.status(401).json({ message: 'Feedback usuário não encontrado.'})
        }
 
        await userWeekFeedback.update(req.body);
        return res.status(200).json({ message: 'Feedback usuário atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { userWeeekFeedbac_Id } = req.params;
        const userId = req.userId;
        const userWeekFeedback = await UserWeekFeedback.findByPk(userWeeekFeedbac_Id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!userWeekFeedback) {
                return res.status(401).json({ message: 'Feedback usuário não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await userWeekFeedback.destroy();
                return res.status(200).json({ message: 'Feedback usuário deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar Feedback usuário.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async userWeeklyFeedback(req, res) {
        const user_id  = req.userId;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const feedBacksUser = await UserWeekFeedback.findAll({ include: [
            { association: "weekFeedBack", attributes: ["title_week", "comment", "weekly_period"], 
                include: [
                    { association: "user", attributes: ["nickname"] }
                ]
            },
            { association: "typeFeedBack", attributes: ["description"] },
        ],
            where: { 
                user_id_student: user_id
            },
            attributes: []
        });

        return res.json(feedBacksUser);
    }
    

}