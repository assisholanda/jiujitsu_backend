const { Model, DataTypes } = require('sequelize');


class Weeks_feedback_teacher extends Model {

    static init(connection) {

        super.init({
            title_week: DataTypes.STRING,
            weekly_period: DataTypes.STRING,
            comment: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user'} )
        this.hasMany( models.User_week_feedback, { foreignKey: 'week_feedback_id', as: 'weekFeedbacks'} )
    }

}

module.exports = Weeks_feedback_teacher;