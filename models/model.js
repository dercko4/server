const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users',{
    id_user: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, allowNull: true, unique: true},
    password: {type: DataTypes.STRING, allowNull:true},
    role: {type: DataTypes.STRING, defaultValue: "user"}
})

const FriendsUsers = sequelize.define('friends_users', {
    id_wire: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_friend: {type: DataTypes.INTEGER, allowNull: true},
})

const RequestInFriends = sequelize.define('request_in_friends', {
    id_request_in_friends: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_mb_friend: {type: DataTypes.INTEGER, allowNull: true},
})

const UserSessions = sequelize.define('user_sessuions', {
    id_session: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ip_user: {type: DataTypes.STRING, allowNull: true}
})

const UserFiles = sequelize.define('user_files', {
    id_file: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: {type: DataTypes.STRING, allowNull: true},
    format_file: {type: DataTypes.STRING},
    size_file: {type: DataTypes.STRING},
    filetype: {type: DataTypes.STRING, defaultValue: "added"},
    favorite: {type: DataTypes.BOOLEAN, defaultValue: "false"}
})

User.hasMany(FriendsUsers)
FriendsUsers.belongsTo(User)

User.hasMany(RequestInFriends)
RequestInFriends.belongsTo(User)

User.hasMany(UserSessions)
UserSessions.belongsTo(User)

User.hasMany(UserFiles)
UserFiles.belongsTo(User)

module.exports=
{
    User,
    FriendsUsers,
    UserSessions,
    UserFiles,
    RequestInFriends
}