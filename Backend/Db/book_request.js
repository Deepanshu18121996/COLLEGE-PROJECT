const mongoose = require("mongoose");
const schema = mongoose.Schema;
const books_Req = new schema({
    email: { type: String, required: true },
    book_title: { type: String, required: true },
    author_name: { type: String, required: true },
    edition: { type: String, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("books_req", books_Req);






