const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
require('dotenv').config()
const router = require('./routes/productRouter')

const app = express()
const hbs = exphbs.create({
    defaultLayout: false
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(3000, ()=>{
    console.log("Ung dung dang khoi dong tai port 3000")
})