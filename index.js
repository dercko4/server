const express = require("express")
require("dotenv").config()
const sequelize = require("./database")
const models = require('./models/model')
const Cryptojs = require('crypto-js')
const router = require('./routes/index')
const cors = require('cors')


const http = require('http')
const HOST='10.1.66.44'
const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
  });
  

app.use(cors())
app.use(express.json())
app.use('/home', router)
app.get('/',(req,res) =>
{
    res.status(200).json({massage:'working'})
}
)
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