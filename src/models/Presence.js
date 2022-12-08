const { Model, DataTypes } = require('sequelize');


class Presence extends Model {

    static init(connection) {
        
        super.init({

        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo( models.Class, { foreignKey: 'class_id', as: 'class' } )
        this.belongsTo( models.User, { foreignKey: 'user_id_student', as: 'student'} )
        this.belongsTo( models.Belt, { foreignKey: 'belt_id', as: 'belt'} )
    }

}

module.exports = Presence;