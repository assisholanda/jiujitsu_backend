// Importação dos models que serão necessários
const User = require('../models/User');
const Notice = require('../models/Notice');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const notices = await Notice.findAll({ include: [
            { association: "user", attributes: ["nickname"] },
            { association: "typenotice", attributes: ["description"] }
        ],
        attributes: ["msg", "date"]
    }
    );
        return res.json(notices)
    },
    
    async store(req, res) {
        
        const { 
            msg,
            date,
            type_notice_id,
            user_id
         } = req.body;

        const notice = await Notice.create({ 
            msg,
            date,
            type_notice_id,
            user_id
        });


        return res.json(notice);
    },

    async update(req, res) {
        
       const { notice_id } = req.params;
       const notice = await Notice.findByPk(notice_id);

       if(!notice) {
           return res.status(401).json({ message: 'Aviso não encontrado.'})
       }

       await notice.update(req.body);
       return res.status(200).json({ message: 'Aviso atualizado com sucesso.' });

    },

    async delete(req, res) {
        
        const { notice_id } = req.params;
        const userId = req.userId;
        const notice = await Notice.findByPk(notice_id, {
            include: [
                {association: 'user', attributes: ["id", "nickname"]}
            ]
        });

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!notice) {
                return res.status(401).json({ message: 'Aviso não encontrado.'})
            }
            
            const userIdNotice = notice.user.id;
            const typeUserLogado = userLogado.typeUsers.id;
            const userIdLogado = userLogado.id;

            if(userIdNotice === userIdLogado || typeUserLogado === 6) {
                await notice.destroy();
                return res.status(200).json({ message: 'Aviso deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar esse aviso.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async noticeUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const notices = await Notice.findAll({ include: [
            { 
                association: "user", attributes: ["nickname"], 
                association: "typeNotice", attributes: ["description"]
            }
        ], 
            where: { user_id: user_id },
            attributes: ["message", "date"]
        });

        return res.json(notices);
    },

    async viewNotice(req, res) {
        
        const { user_id } = req.params;
        const { notice_id } = req.body;
        const user = await User.findByPk(user_id);
        
        if(user) {

            var notice = await Notice.findByPk(notice_id);
            if(!notice) {
                return res.status(400).json({ error: 'Aviso não encontrado.' })    
            }
        }else {
            return res.status(400).json({ error: 'Usuário não encontrado.' })
        }

        /* console.log(user);
        return res.json(user);
        console.log(user_id, notice_id); */
        console.log('chegou');
        await user.addNotice(notice);
        return res.status(200).json({ message: "Leitura de aviso confirmada." })
    },

    async teste(req, res) {

        const { user_id } = req.params;
        const { name } = req.body;
        const id = 2;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado'});
        }

        const notice = await Notice.findByPk(id);

        await user.addNotice(notice);

        return res.json(notice);

    }    
    

}