const { Model, DataTypes } = require('sequelize');


class Payment extends Model {

    static init(connection) {
        
        super.init({
            date_payment: DataTypes.DATEONLY,
            references_month: DataTypes.STRING,
            references_year: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo( models.User, { foreignKey: 'user_id_student', as: 'student'} )
        this.belongsTo( models.User, { foreignKey: 'user_id_register', as: 'register'} )
    }

}

module.exports = Payment;