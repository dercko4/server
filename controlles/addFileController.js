const ApiError = require('../ApiError')
const {UserFiles} = require('../models/model')
const path = require('path')
const fs = require('fs')

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) {
		return '0';
	} else {
		var k = 1024;
		var dm = decimals < 0 ? 0 : decimals;
		var sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
}


class addFileController
{
    async upload_avatar(req, res, next)
    {
        const userIdUser = req.user.id_user
        if(!req.files.file_avatar) return next(ApiError.badRequest(`Не удалось взять файл!`))
        const file = req.files.file_avatar
        const filename = file.name
        await fs.mkdir(`${userIdUser}`, err=>{
            if(err) throw err; // не удалось создать папку
            else console.log('Папка успешно создана');
        }
        )
        await file.mv(`D:/Kurs/Server/${userIdUser}`+ filename)
        const filesize = formatBytes(file.size)
        const filetype = file.mimetype
        const file_db = await UserFiles.create({filename, size_file: filesize, format_file: filetype, userIdUser: userIdUser})
        if(filetype.split('/')[0]=="image" || filetype.split('/')[0]=="text") return res.sendFile(`D:/Kurs/Server/Files/${file.name}`)
        else return res.json({messenge: "Файл загружен!"})
    }
}

module.exports = new addFileController()