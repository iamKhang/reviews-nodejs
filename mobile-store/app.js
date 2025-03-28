// File: app.js
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const mobileRoutes = require('./routes/mobileRoutes');

const app = express();

// Cấu hình Handlebars
const hbs = exphbs.create({
    defaultLayout: false,
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', mobileRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Có lỗi xảy ra!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
}); 