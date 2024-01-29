const express = require("express")
require("dotenv").config()
const sequelize = require("./database")
const models = require('./models/model')
const Cryptojs = require('crypto-js')
const router = require('./routes/index')
const cors = require('cors')

const PORT = process.env.PORT

const app = express()

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
        app.listen(PORT, () => console.log(`Server start on ${PORT} `))
    }
    catch(e){
        console.log(e)
    }
}

start()