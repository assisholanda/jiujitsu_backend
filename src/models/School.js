const { Model, DataTypes } = require('sequelize');

class School extends Model {

    static init(connection) {
        
        super.init({
            description: DataTypes.STRING
        }, {
            sequelize: connection
        })  
    }

    static associate(models) {
        this.hasMany( models.User, { foreignKey: 'school_id', as: 'school' } )
        this.hasMany( models.Class, { foreignKey: 'school_id', as: 'classes' } )
        this.belongsTo( models.User, { foreignKey: 'user_id_teacher', as: 'teacher'} )
    }

}

module.exports = School;