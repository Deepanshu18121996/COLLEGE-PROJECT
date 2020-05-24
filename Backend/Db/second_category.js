const mongoose = require('mongoose');
const schema = mongoose.Schema;
const second_books_category = new schema({

  category: { type: String, required: true, unique: true },

});
//add_books_category = table name/model name
module.exports = mongoose.model('second-category', second_books_category);
