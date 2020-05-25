const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');
const books = require('../books.json');

//1- Get all authors
router.get('/authors', (req, res)=>{
	res.json(authors);
});

//3- Add an author
router.post('/authors', (req, res) =>{
    const {id, name, lastname} = req.body;
    if(id && name && lastname){
        const newAuthor = {...req.body};
        authors.push(newAuthor);
        res.status(201).json({'added': 'Author created'});
    }else{
        res.status(400).json({'statusCode': 'Bad Request'});
    }
})

//5- Modify an author
router.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    const {name, lastname} = req.body;
    
    _.each(authors, (author) => {
        if(author.id == id){
            author.name = name ? name : author.name;
            author.lastname = lastname ? lastname : author.lastname;
        }
    });
    res.json({'modified': 'ok'});
});

//7- Delete a author
router.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
	if ( _.find(books, book =>  {return book.id == id} ) ){
	    res.status(200).json({'statusCode': 'There are books associated with this author'});
	}else{
		_.remove(authors, (author) =>{
	        return author.id == id
	    });
	    res.json(authors);
	}	        
});


module.exports = router;