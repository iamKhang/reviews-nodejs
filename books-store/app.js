const experss = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./routes/book.router')
require('dotenv').config()


const app = experss()
const hbs = exphbs.create({
    defaultLayout: false
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(experss.static(path.join(__dirname, 'public')))
app.use(experss.json())
app.use(experss.urlencoded({
    extended: true
}))
app.use('/', router)


app.listen(3000, ()=> {
    console.log('Ung dung da duoc khoi dong')
}) 