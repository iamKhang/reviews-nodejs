const express = require('express')
const exphbs = require('express-handlebars')
require('dotenv').config()
const path = require('path')
const router = require('./routes/paper.router')

const app = express()
const hbs = exphbs.create({
    defaultLayout: false
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use('/', router)

app.listen(3000, ()=>{
    console.log('Ung dung da chay!')
})
