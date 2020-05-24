const { Router } = require('express');
const router = Router();
const books = require('./book.route');
const authors = require('./author.route');

router.use('/api', books)
router.use('/api', authors)

module.exports = router;
