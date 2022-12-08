const { Model, DataTypes } = require('sequelize');

class Class extends Model {

    static init(connection) {
        
        super.init({
            description: DataTypes.STRING,
            date: DataTypes.DATEONLY
        }, {
            sequelize: connection
        })
        
    }

    static associate(models) {
        this.hasMany( models.Presence, { foreignKey: 'class_id', as: 'presences' } )
        this.belongsTo( models.School, { foreignKey: 'school_id', as: 'school'})
    }

}

module.exports = Class;