const { Model, DataTypes } = require('sequelize');

class Type_user extends Model {

    static init(connection) {
        
        super.init({
            description: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany( models.User, { foreignKey: 'type_users_id', as: 'typeUsers' } )
    }

}

module.exports = Type_user;