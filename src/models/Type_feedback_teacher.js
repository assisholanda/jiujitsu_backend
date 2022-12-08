const { Model, DataTypes } = require('sequelize');

class Type_feedback_teacher extends Model {

    static init(connection) {

        super.init({
            description: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany( models.User_week_feedback, { foreignKey: 'type_feedback_id', as: 'typeFeedbackStudent'} )
    }

}

module.exports = Type_feedback_teacher;