const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const Book = require('./models/bookModel')

const app = express();
app.use(bodyParser.json());

connectDB();

const bookRouter = express.Router();
const port = process.env.PORT || 5000;

bookRouter.route('/books')
  .get((req, res) => {
    const { query } = req.query;
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  })

bookRouter.route('/books/:id')
  .get((req, res) => {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Book.findByIdAndDelete(id, (err, _book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(true);
    })
  })
  .patch((req, res) => {
    const { id } = req.params;
    Book.findByIdAndUpdate(id, req.body, { new: true }, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    })
  })

bookRouter.route('/books')
  .post(async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.json(newBook);
    }
    catch (err) {
      res.json('Create: Error occured');
    }
  })

app.use("/api", bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
