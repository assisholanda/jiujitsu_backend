const { Model, DataTypes } = require('sequelize');


class Result_challenge extends Model {

    static init(connection) {
        
        super.init({
            comment_teacher: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo( models.Challenge, { foreignKey: 'challenge_id', as: 'challenge' } )
        this.belongsTo( models.User, { foreignKey: 'user_id_champion', as: 'champion'} )
        this.belongsTo( models.User, { foreignKey: 'user_id_teacher', as: 'teacher'} )
    }

}

module.exports = Result_challenge;