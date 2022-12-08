const { Model, DataTypes } = require('sequelize');


class Challenge extends Model {

    static init(connection) {
        
        super.init({
            date: DataTypes.DATEONLY,
            status: DataTypes.INTEGER,
            reason: DataTypes.STRING,
            is_acepted: DataTypes.INTEGER
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo( models.User, { foreignKey: 'user_id_challenger', as: 'challenger'} )
        this.belongsTo( models.User, { foreignKey: 'user_id_challenged', as: 'challenged'} )
        this.belongsTo( models.User, { foreignKey: 'user_id_teacher', as: 'teacher'} )
        this.belongsTo( models.School, { foreignKey: 'school_id', as: 'school' } )
    }

}

module.exports = Challenge;