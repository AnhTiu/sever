const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRouter = require('./routers')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dbConnect()
initRouter(app)
//app.use('/', (req, res) => {res.send('SEVER ON')})

app.listen(port, () =>{
    console.log('Server is running on the port: ' + port);
})