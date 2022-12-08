const { Model, DataTypes } = require('sequelize');


class Historic_user extends Model {

    static init(connection) {
        
        super.init({
            description: DataTypes.STRING,
            date: DataTypes.DATEONLY,
            show_student: DataTypes.BOOLEAN,
            path_image: DataTypes.STRING,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo( models.User, { foreignKey: 'user_id_student', as: 'student'} )
        this.belongsTo( models.User, { foreignKey: 'user_id_register', as: 'register'} )
    }

}

module.exports = Historic_user;