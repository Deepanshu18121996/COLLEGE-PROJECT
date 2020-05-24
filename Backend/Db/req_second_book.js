const mongoose = require('mongoose');
const schema = mongoose.Schema;
const req_second_books = new schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  writer: { type: String, required: true },
  edition: { type: String, required: true },
  published_year: { type: String, required: true },
  status: { type: String, required: true },
  createrd_at: { type: Date, default: Date.now() },
  image: { type: String, required: true },
});
//action_adventure_books = table name/model name
module.exports = mongoose.model('req_second-book', req_second_books);
