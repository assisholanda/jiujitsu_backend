const { Model, DataTypes } = require('sequelize');

class Type_notice extends Model {

    static init(connection) {

        super.init({
            description: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany( models.Notice, { foreignKey: 'type_notice_id', as: 'notices' } )
    }

}

module.exports = Type_notice;