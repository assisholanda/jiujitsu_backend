// Importação dos models que serão necessários
const User = require('../models/User');
const Notice = require('../models/Notice');
const Presence = require('../models/Presence');


// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const users = await User.findAll({ include: [
            { association: "typeUsers", attributes: ["description"] },
            { association: "belt", attributes: ["description"] },
            { association: "school", attributes: ["description"] },
            { association: "statusUser", attributes: ["description"] }
        ]
    });
        return res.json(users)
    },
    
    async store(req, res) {
        const { 
            name,
            nickname,
            address,
            number,
            complement,
            district,
            password_hash,
            birth_date,
            cpf,
            initial_date,
            number_graus,
            type_users_id,
            belt_id,
            school_id,
            status_user_id,
            email
         } = req.body;

        const user = await User.create({ 
            name,
            nickname,
            address,
            number,
            complement,
            district,
            password_hash,
            birth_date,
            cpf,
            initial_date,
            number_graus,
            type_users_id,
            belt_id,
            school_id,
            status_user_id,
            email 
        });

        return res.json(user);
    },

    async update(req, res) {
        
        const userUpdate = req.body;
        const userId = req.userId;
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(401).json({message: 'Usuário não encontrado.'});    
        }

        if(userUpdate.email !== user.email) {

            const emailexists = await User.findOne({
                where: { email: userUpdate.email }
            });
    
            if(emailexists) {
                return res.status(401).json({message: 'Email solicitado como alteração já cadastrado em outro usuário.'});        
            } 
        } 

        await user.update(req.body);
        return res.status(200).json({message: 'Usuário atualizado com sucesso.'});
        
    },

    async delete(req, res) {

        const { user_id } = req.params;
        const user = await User.findByPk(user_id);
        
        if(!user) {
            return res.status(401).json({message: 'Usuário não encontrado.'});
        }

        await user.destroy();

        return res.status(200).json({message: 'Usuário deletado ccom sucesso.'});

    },

    async viewNotice(req, res) {
        
        const { user_id } = req.params;
        const { notice_id } = req.body;

        const user = await User.findByPk(user_id);
        const notice = await Notice.findByPk(notice_id);
       
        
        if(!user) {
            return res.status(400).json({ message: "Usuário não encontrado." })
        }

        try {
            await user.addNotice(notice);
        }catch(err) {
            return res.status(400).json({ erro: err.message })
        }

        
        return res.json(notice);
    },

    async classesUser(req, res) {

        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ message: "Usuário não encontrado." })
        }

        const presences = await Presence.findAll({
            attributes: ["class_id"],           
            include: [
               { association: 'class', attributes: ["date", "description"],
                    include: [
                        { association: 'school', attributes: ["description"] }
                    ]
               },
               { association: 'belt', attributes: ["description"]}
           ],
            where: { 
                user_id_student: user_id
            }
        });

        return res.json(presences);


    }

}