const { Model, DataTypes } = require('sequelize');


class Feed extends Model {

    static init(connection) {
        
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            path_image: DataTypes.STRING,
            post_excluisve: DataTypes.BOOLEAN
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user'} )
    }
}

module.exports = Feed;