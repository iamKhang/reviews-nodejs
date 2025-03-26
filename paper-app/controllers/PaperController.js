const Book = require('../models/Book')

class BookController{
    static async index(req, res){
        const items = await Book.getAll()
        res.render('index', {items})
    }
    static async showAddForm(req, res){
        res.render('add')
    }
    static async create(req, res){
        try {
            // Validate required fields
            if (!req.body.isbn || !req.body.paperTitle || !req.body.authors) {
                throw new Error('Missing required fields');
            }

            const paperData = {
                isbn: req.body.isbn,
                paperTitle: req.body.paperTitle,
                authors: req.body.authors,
                pages: parseInt(req.body.pages) || 0
            };

            await Book.create(paperData, req.file)
            res.redirect('/')
        } catch (error) {
            console.error('Error creating paper:', error)
            res.render('add', { error: error.message })
        }
    }
}

module.exports = BookController