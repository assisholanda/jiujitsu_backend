const { Model, DataTypes } = require('sequelize');

class Notice extends Model {

    static init(connection) {
        
        super.init({
            msg: DataTypes.STRING,
            date: DataTypes.DATEONLY
        }, {
            sequelize: connection
        }) 
    }

    static associate(models) {
        this.belongsTo( models.Type_notice, { foreignKey: 'type_notice_id', as: 'typenotice' } )
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user' } )
        this.belongsToMany( models.User, { foreignKey: 'notice_id', through: 'user_notices', as: 'users'} )
    }

}

module.exports = Notice;