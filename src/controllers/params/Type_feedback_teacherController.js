const Type_feedback_teacher = require('../../models/Type_feedback_teacher');

module.exports = {

    async index(req, res) {
        const typeFeedBackTeachers = await Type_feedback_teacher.findAll();
        res.json(typeFeedBackTeachers);
    },

    async store (req, res) {
        console.log('Passou');
        const {description} = req.body;
        const typeFeedBackTeacher = await Type_feedback_teacher.create({ description });
        return res.json(typeFeedBackTeacher);
    },

    async update(req, res) {
        
        const { type_feedback_id } = req.params;
        const typeFeedbackTeacher = await Type_feedback_teacher.findByPk(type_feedback_id);
 
        if(!typeFeedbackTeacher) {
            return res.status(401).json({ message: 'Tipo de feedback não encontrado.'})
        }
 
        await typeFeedbackTeacher.update(req.body);
        return res.status(200).json({ message: 'Tipo de feedback atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { type_feedback_id } = req.params;
        const typeFeedback = await Type_feedback_teacher.findByPk(type_feedback_id);

            if(!typeFeedback) {
                return res.status(401).json({ message: 'Tipo de FeedBack não encontrado.'})
            }

            await typeFeedback.destroy();
            return res.status(200).json({ message: 'Tipo de FeedBack deletado com sucesso.' });
    }

}