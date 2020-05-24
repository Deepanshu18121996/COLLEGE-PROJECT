const mongoose = require("mongoose");
const schema = mongoose.Schema;
const notes_category = new schema({
    notecat: { type: String, required: true, unique: true },
});
//add_notes_category = table name/model name
module.exports = mongoose.model("notes_category", notes_category);
