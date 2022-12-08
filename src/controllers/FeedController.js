// Importação dos models que serão necessários
const User = require('../models/User');
const Feed = require('../models/Feed');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const feed = await Feed.findAll({ include: [
            { association: "user", attributes: ["nickname"], 
              include:[ 
                  { association: "belt", attributes: ["description"] },
                  { association: "school", attributes: ["description"] },
              ] 
            },
        ],
        attributes: ["description", "path_image", "post_excluisve"]
    }
    );
        return res.json(feed)
    },
    
    async store(req, res) {

        const user_id = req.userId;
        const { 
            title,
            description,
            path_image,
            post_excluisve
         } = req.body;

        const user = await User.findByPk(user_id);
        
        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.' })
        }

        const feed = await Feed.create({ 
            title,
            description,
            path_image,
            post_excluisve,
            user_id
        });

        return res.json(feed);
    },

    async update(req, res) {
        
        const { feed_id } = req.params;
        const feed = await Feed.findByPk(feed_id);
 
        if(!feed) {
            return res.status(401).json({ message: 'Post não encontrado.'})
        }
 
        await feed.update(req.body);
        return res.status(200).json({ message: 'Post atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { feed_id } = req.params;
        const userId = req.userId;
        const feed = await Feed.findByPk(feed_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!feed) {
                return res.status(401).json({ message: 'Post não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6 || feed.user_id === userId) {
                console.log('passou na verificação');
                await feed.destroy();
                return res.status(200).json({ message: 'Post deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar post.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async feedUser(req, res) {
        const { user_id } = req.params;
        //const userId = req.userId;
        
        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const feed = await Feed.findAll({ include: [
            { association: "user", attributes: ["nickname"], 
              include:[ 
                  { association: "belt", attributes: ["description"] },
                  { association: "school", attributes: ["description"] },
              ] },
        ], 
            where: { user_id: user_id },
            attributes: ["description", "path_image", "post_excluisve"] 
        });

        return res.json(feed);

    }

}