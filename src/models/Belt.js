const { Model, DataTypes } = require('sequelize');

class Belt extends Model {

    static init(connection) {
        
        super.init({
            description: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany( models.User, { foreignKey: 'belt_id', as: 'belt' } )
        this.hasMany( models.Presence, { foreignKey: 'belt_id', as: 'beltPresences' } )        
    }

}

module.exports = Belt;