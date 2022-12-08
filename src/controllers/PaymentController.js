// Importação dos models que serão necessários
const User = require('../models/User');
const Payment = require('../models/Payment');

// exporta os métodos pra serem acessados lá do arquivo de rotas
module.exports = {

    async index(req, res) {
        const payments = await Payment.findAll({ include: [
            { association: "student", attributes: ["nickname"],
                include:[ 
                    { association: "belt", attributes: ["description"] },
                    { association: "school", attributes: ["description"] },
                ] 
            },
            { association: "register", attributes: ["nickname"] }
        ],
        attributes: ["date_payment", "references_month", "references_year"]
    }
    );
        return res.json(payments)
    },
    
    async store(req, res) {
        
        const user_id_register  = req.userId;
        const { 
            date_payment,
            references_month,
            references_year,
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

        const payment = await Payment.create({ 
            date_payment,
            references_month,
            references_year,
            user_id_student,
            user_id_register
        });

        return res.json(payment);
    },

    async update(req, res) {
        
        const { payment_id } = req.params;
        const payment = await Payment.findByPk(payment_id);
 
        if(!payment) {
            return res.status(401).json({ message: 'Pagamento não encontrado.'})
        }
 
        await payment.update(req.body);
        return res.status(200).json({ message: 'Pagamento atualizado com sucesso.' });
 
     },

     async delete(req, res) {
        
        const { payment_id } = req.params;
        const userId = req.userId;
        const payment = await Payment.findByPk(payment_id);

        const userLogado = await User.findByPk(userId, {
            include: [
                {association: 'typeUsers', attributes: ["id", "description"]}
            ]
        });

        if(userLogado) {
            if(!payment) {
                return res.status(401).json({ message: 'Pagamento não encontrado.'})
            }
            
            const typeUserLogado = userLogado.typeUsers.id;

            if(typeUserLogado === 6) {
                await payment.destroy();
                return res.status(200).json({ message: 'Pagamento deletado com sucesso.' });
            }else {
                return res.status(401).json({ message: 'Você não tem permissão pra deletar pagamento.'})
            }

        } else {
            return res.status(401).json({ message: 'Usuário não encontrado.'})
        }
 
     },

    async paymentUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.'})
        }

        const payments = await Payment.findAll({ include: [
            { association: "student", attributes: ["name", "nickname"] },
            { association: "register", attributes: ["nickname"] }
        ], 
            where: { user_id_student: user_id },
            attributes: ["date_payment", "references_month", "references_year"]
        });

        return res.json(payments);
    }
    

}