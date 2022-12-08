const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {

    static init(connection) {
        
        super.init({
            name: DataTypes.STRING,
            nickname: DataTypes.STRING,
            address: DataTypes.STRING,
            number: DataTypes.INTEGER,
            complement: DataTypes.STRING,
            district: DataTypes.STRING,
            password_hash: DataTypes.STRING,
            birth_date: DataTypes.DATEONLY,
            cpf: DataTypes.STRING,
            initial_date: DataTypes.DATEONLY,
            number_graus: DataTypes.INTEGER,
            email: DataTypes.STRING,
        }, {
            sequelize: connection
        });

        this.beforeSave( async (user) => {
            if(user.password_hash) {
                user.password_hash = await bcrypt.hash(user.password_hash, 8);
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsTo( models.Type_user, { foreignKey: 'type_users_id', as: 'typeUsers' } )
        this.belongsTo( models.Belt, { foreignKey: 'belt_id', as: 'belt' } )
        this.belongsTo( models.School, { foreignKey: 'school_id', as: 'school' } )
        this.belongsTo( models.Status_user, { foreignKey: 'status_user_id', as: 'statusUser' } )
        this.hasMany( models.Feed, { foreignKey: 'user_id', as: 'feeds' } )
        this.hasMany( models.Notice, { foreignKey: 'user_id', as: 'avisos'})
        this.hasMany( models.Weeks_feedback_teacher, { foreignKey: 'user_id', as: 'weeksFeedbackTeachers'} )
        this.hasMany( models.Payment, { foreignKey: 'user_id_student', as: 'students'} )
        this.hasMany( models.Payment, { foreignKey: 'user_id_register', as: 'registers'} )
        this.hasMany( models.School, { foreignKey: 'user_id_teacher', as: 'schools'} )
        this.belongsToMany( models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs'} )
        this.belongsToMany( models.Notice, { foreignKey: 'user_id', through: 'user_notices', as: 'notices'} )
        this.hasMany( models.User_week_feedback, { foreignKey: 'user_id_student', as: 'studentFeedback'} )
        this.hasMany( models.Presence, { foreignKey: 'user_id_student', as: 'studentPresences'} )
        
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }

}

module.exports = User;