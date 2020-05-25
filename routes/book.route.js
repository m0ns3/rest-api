const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const books = require('../books.json');
const authors = require('../authors.json');

//2- Get all books with the author
router.get('/books', (req, res)=>{
	let booksWithAuthor = [];
	let obj = {};
    _.forEach(books, function(book) { 
    	_.forEach(authors, function(author) { 
    		if (book.authorId == author.id) { 
    			obj= {"id":book.id,	"name":book.name, "author":author};					
    			booksWithAuthor.push(obj);
    		}				
		}); 
	});
    res.status(200).json(booksWithAuthor);
    console.log(booksWithAuthor);
});

//4- Add a book
router.post('/books', (req, res) =>{
    const {id, name, authorId} = req.body;
    if(id && name && authorId){
        const newBook = {...req.body};
        books.push(newBook);
        res.status(201).json({'added': 'Book created'});
    }else{
        res.status(400).json({'statusCode': 'Bad Request'});
    }
});

//6- Modify a book
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

//8- Delete a book
router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    if ( _.find(books, book =>  {return book.id == id} ) ){
    	_.remove(books, (book) =>{
        	return book.id == id
    	});
    	res.json(books);
    }else{
    	res.status(200).json({'statusCode': 'There are no books with this id'});
    }   
});


module.exports = router;