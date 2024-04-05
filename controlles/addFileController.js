const ApiError = require('../ApiError')
const {User} = require('../models/model')
const path = require('path')
const fs = require('fs');
const {QueryTypes} = require('sequelize')
const sequelize = require('../database');

// function formatBytes(bytes, decimals = 2) {
// 	if (bytes === 0) {
// 		return '0';
// 	} else {
// 		var k = 1024;
// 		var dm = decimals < 0 ? 0 : decimals;
// 		var sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
// 		var i = Math.floor(Math.log(bytes) / Math.log(k));
// 		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// 	}
// }


class addFileController
{
    async upload_avatar(req, res, next)
    {
        const id_user = req.user.id_user
        //const userStorageIdStorage = await UserStorage.findOne({where: {userIdUser: userIdUser}})
        if(!req.files) return next(ApiError.badRequest(`Не удалось взять файл!`))
        if(!req.files.file_avatar) return next(ApiError.badRequest(`Не удалось взять файл!`))
        const file = req.files.file_avatar
        const avatar_name = file.name
        let path_avatar = __dirname + "/avatars/" + id_user
        await fs.mkdir(path_avatar, err=>{
            if(err) throw err; // не удалось создать папку
            else console.log('Папка успешно создана');
        }
        )
        path_avatar += avatar_name
        await file.mv(path_avatar)
        const file_db = await sequelize.query(`UPDATE "users" SET path_avatar='${path_avatar}' WHERE id_user='${id_user}'`)
        return res.sendFile(`${path_avatar}`)
    }
}

module.exports = new addFileController()