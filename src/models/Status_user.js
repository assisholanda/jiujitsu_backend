const { Model, DataTypes } = require('sequelize');

class Status_user extends Model {

    static init(connection) {

        super.init({
            description: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany( models.User, { foreignKey: 'status_user_id', as: 'statusUser' } )
    }

}

module.exports = Status_user;