const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const books = require('../books.json')

router.get('/books', (req, res)=>{
	res.json(books);
});

router.post('/books', (req, res) =>{
    const {id, name, authorId} = req.body;
    if(id && name && authorId){
        const newBook = {...req.body};
        books.push(newBook);
        res.json({'added': 'ok'});
    }else{
        res.status(400).json({'statusCode': 'Bad Request'});
    }
})

router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    _.remove(books, (book) =>{
        return book.id == id
    })
    res.json(books);
});

router.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const {name, authorId} = req.body;
    
    _.each(books, (book) => {
        if(book.id == id){
            book.name = name ? name : book.name;
            book.authorId = authorId ? authorId : book.authorId;
        }
    });
    res.json({'modified': 'ok'});
});

module.exports = router;