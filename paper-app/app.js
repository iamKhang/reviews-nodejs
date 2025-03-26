const express = require('express')
const exphbs = require('express-handlebars')

const path = require('path')

require('dotenv').config()

const app = express()

const port = 3000

const hbs = exphbs.create({
    defaultLayout: false,
    extname: '.handlebars'
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/index') )

app.listen(port, ()=>{
    console.log('Ung dung da duoc chay o port 3000')
})