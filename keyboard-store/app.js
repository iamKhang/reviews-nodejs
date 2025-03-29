const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
require('dotenv').config()
const routes = require('./routes/keyboardRouter')

const app = express()
const hbs = exphbs.create({
    defaultLayout: false
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)


app.listen(3000, () => {
    console.log('Ung dung da chay tren port 3000')
})
