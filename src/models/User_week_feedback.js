const { Model, DataTypes } = require('sequelize');


class User_week_feedback extends Model {

    static init(connection) {
        
        super.init({

        }, {
            sequelize: connection,
            tableName: 'users_weeks_feedbacks'
        })
    }

    static associate(models) {
        this.belongsTo( models.Weeks_feedback_teacher, { foreignKey: 'week_feedback_id', as: 'weekFeedBack' } )
        this.belongsTo( models.User, { foreignKey: 'user_id_student', as: 'student'} )
        this.belongsTo( models.Type_feedback_teacher, { foreignKey: 'type_feedback_id', as: 'typeFeedBack'} )
    }

}

module.exports = User_week_feedback;