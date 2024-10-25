const express = require("express")
require("dotenv").config()
const sequelize = require("./database")
const cors = require('cors')
const {DataTypes} = require("sequelize")


const http = require('http')
const HOST=process.env.HOST
const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
  });
app.use(cors())
app.use(express.json())

const User = sequelize.define('users', {
    id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    login:{type: DataTypes.STRING, unique: true},
    passwd: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: "Student"},
})


app.post('/add', async(req, res) => {
    const {login, passwd} = req.body
    const user = await User.create({login, passwd})
    res.json(user)
   })

   app.get('/people', async(req, res) =>{
    const id = req.query.id
    const user = await sequelize.query(`SELECT * FROM users WHERE id=${id}`);
    return res.json(user[0])
})


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, HOST, () => console.log(`Server start on ${HOST}:${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}

start()