/*
FileName - books.ts
AuthorName - Jerome Ching
StudentID - 300817930
WebAppName - COMP229-M2021-Midterm-300817930
*/

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */ 
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

/* GET books Add page. READ */ 
router.get('/add', (req, res, next) => 
{
  res.render('books/details', {title: 'Add', page: 'add', books: ''});    
});

/* POST Process books Add page. CREATE (new book) */ 
router.post('/add', (req, res, next) => {

  let newBook = new book //Make New Book object
  ({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.create(newBook, (err) => //pass newBook to create Book then redirect
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});

/* GET books Edit page. READ (use id to get book)*/
router.get('/:id', (req, res, next) => {

    let id = req.params.id;
    console.log(id);

    book.findById(id, {}, {}, (err, editBook) => //Find Book using id
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
      res.render('books/details', {title: 'Edit', page: 'edit', books: editBook});
    });

});
/* POST books Edit page. PROCESS (Edit Book info) */
router.post('/:id', (req, res, next) => {

    let id = req.params.id;
    console.log(id);

    let editBook = new book //make new book with same id (replace old one)
    ({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.updateOne({_id: id}, editBook, {}, (err) => //Update Book then redirect
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      res.redirect('/books');
    });

});

/* GET books Delete page. DELETE PROCESS */
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  console.log(id);

  book.remove({_id: id}, (err) => //use id to delete book
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});


//module.exports = router;
