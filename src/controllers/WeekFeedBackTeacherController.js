const WeekFeedBackTeacher = require('../models/Weeks_feedback_teacher');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const weekFeedBackTeachers = await WeekFeedBackTeacher.findAll({ include: [
            { 
                association: "user", attributes: ["nickname"]
            },
        ],
        attributes: ["title_week", "weekly_period", "comment"]
    }
    );
        return res.json(weekFeedBackTeachers)
    },

    async store(req, res) {

        const user_id = req.userId;
        const { title_week, weekly_period, comment } = req.body;

        const user = await User.findByPk(user_id);
        
        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.' })
        }

        const weekFeedbackTeacher = await WeekFeedBackTeacher.create({
            title_week, weekly_period, comment, user_id
        });

        return res.json(weekFeedbackTeacher);
    },

    async update(req, res) {
        
        const { week_feedback_id } = req.params;
        const weekFeedback = await WeekFeedBackTeacher.findByPk(week_feedback_id);
 
        if(!weekFeedback) {
            return res.status(401).json({ message: 'Feedback semanal não encontrado.'})
        }
 
        await weekFeedback.update(req.body);
        return res.status(200).json({ message: 'Feedback semanal atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { week_feedback_id } = req.params;
        const userId = req.userId;
        const weekFeedback = await WeekFeedBackTeacher.findByPk(week_feedback_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!weekFeedback) {
                return res.status(401).json({ message: 'Feedback semanal não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await weekFeedback.destroy();
                return res.status(200).json({ message: 'Feedback semanal deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar pagamento.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async WeekFeedBackTeacherUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const feedBacksUser = await WeekFeedBackTeacher.findAll({ include: [
            { 
                association: "user", attributes: ["nickname"]
            }
        ], 
            where: { user_id: user_id },
            attributes: ["title_week", "weekly_period", "comment"]
        });

        return res.json(feedBacksUser);
    }

}